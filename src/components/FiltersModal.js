import React, { useEffect, useRef } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { FilterSearch } from "./FilterSearch";
import RBSheet from "react-native-raw-bottom-sheet";
import Close from "./SVGs/Close";
import { Switch } from "react-native-elements";
import SwitchOpenOrClose from "./Switch";
import TypeOfSearch from "./TypeOfSearch";
import CharacteristicsFilter from "./CharacteristicsFilter";
import DistanceSlider from "./DistanceSlider";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { RestaurantService } from "deliziora-client-module/client-web";
import { setFilteredRestaurants } from "../redux/features/restaurants/restaurantsSlice";
export default function FiltersModal() {
  const dispatch = useDispatch();
  const selectedCharacteristics = useSelector((state) => state.characteristics);
  const selectedOption = useSelector(
    (state) => state.typesOfSearch.selectedOption
  );
  const status = useSelector((state) => state.switchSlice.status);
  const typesOfSearch = useSelector(
    (state) => state.typesOfSearch.selectedOption
  );
  const distanceValue = useSelector((state) => state.distance.value);
  const coords = useSelector((state) => state.location.location);
  const allRestaurants = useSelector(
    (state) => state.restaurants.allRestaurants
  );
  const filteredRestaurants = useSelector(
    (state) => state.restaurants.filteredRestaurants
  );

  const rbSheetRef = useRef();

  const applyFilters = () => {
    console.log("teste");
    console.log({
      is_open: status == "opened" ? true : false,
      lng: coords.longitude,
      lag: coords.latitude,
      complete_menu:
        typesOfSearch == "complete_menu" || typesOfSearch == "all"
          ? true
          : false,
      especialty:
        typesOfSearch == "especialty" || typesOfSearch == "all" ? true : false,
      distance: distanceValue,
      characteristics: selectedCharacteristics,
    });
    // OpenAPI.BASE = "http://192.168.1.65:8000"
    RestaurantService.filterRestaurant({
      is_open: status == "opened" ? true : false,
      lng: String(coords.longitude),
      lag: String(coords.latitude),
      complete_menu:
        typesOfSearch == "complete_menu" || typesOfSearch == "all"
          ? true
          : false,
      especialty:
        typesOfSearch == "especialty" || typesOfSearch == "all" ? true : false,
      distance: distanceValue,
      characteristics: selectedCharacteristics,
    })
      .then((res) => {
        {
          dispatch(setFilteredRestaurants(res.data));
          if (res.data.length === 0) {
            Toast.show({
              type: "info",
              text1: "Nenhum restaurante encontrado",
              text1Style:{fontSize:16},
              text2Style:{fontSize:12},
              text2: "Por favor refazer o filtro",
              position: "bottom",
              autoHide: true,
              onHide: ()=>{
                dispatch(setFilteredRestaurants(allRestaurants));
              }
            });
          }
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
      })
      .finally(() => {
        rbSheetRef.current.close();
      });
  };


  const handleClearFilters = () => {
    dispatch(setFilteredRestaurants(allRestaurants));
    rbSheetRef.current.close();
  };

  return (
    <>
      <Pressable onPress={() => rbSheetRef.current.open()}>
        <FilterSearch />
      </Pressable>
      <RBSheet
        ref={rbSheetRef}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
            borderRadius: 24,
            ...Platform.select({
              ios: {
                marginTop: 20,
              },
              android: {
                // Estilos para Android, se necessário
              },
              default: {
                // Estilos padrão para outras plataformas
              },
            }),
          },
        }}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => rbSheetRef.current.close()}>
              <Close />
            </Pressable>
            <Text>Filtros</Text>
          </View>
          <View style={styles.modalBody}>
            <Text
              style={{
                fontWeight: "bold",
                marginTop: 5,
              }}
            >
              Status de Funcionamento
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                paddingBottom: 15,
              }}
            >
              <Text>Mostrar apenas restaurantes abertos </Text>
              <SwitchOpenOrClose />
            </View>
            <View
              style={{
                paddingTop: 10,
                gap: 10,
                borderTopWidth: 1,
                borderTopColor: "gray",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Tipo de Menu
              </Text>
              <TypeOfSearch />
            </View>
            <View
              style={{
                paddingTop: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Caracteristicas
              </Text>
              <Text>
                Busque por Restaurantes, com uma ou mais caracteristicas
              </Text>
            </View>
            <View
              style={{
                paddingBottom: 15,
              }}
            >
              <CharacteristicsFilter />
            </View>
            <View
              style={{
                paddingTop: 10,
                borderTopColor: "gray",
                borderTopWidth: 1,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Distância
              </Text>
              <DistanceSlider />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 40,
                justifyContent: "space-evenly",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Pressable
                style={{
                  backgroundColor: "white",
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "auto",
                  minWidth: 150,
                  height: 40,
                  borderColor: "#000000",
                  borderWidth: 1,
                  marginTop: 10,
                  padding: 10,
                }}
                onPress={handleClearFilters}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#000000",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  Limpar filtros
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#000000",
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "auto",
                  minWidth: 150,
                  height: 40,
                  marginTop: 10,
                  padding: 10,
                }}
                onPress={applyFilters}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  Ver Restaurantes
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </RBSheet>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingVertical: 8,
    minWidth: "90%",
  },
  modalHeader: {
    width: "100%",
    display: "flex",
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
});
