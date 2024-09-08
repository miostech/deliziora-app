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
import { setFilteredRestaurants, setFiltersIsActive } from "../redux/features/restaurants/restaurantsSlice";
import SwitchMenuOfTheDay from "./SwitchMenuOfTheDay";
import SwitchFilters from "./SwitchMenuOfTheDay";
import { updateNewFiltersTypeCompleteMenu, updateNewFiltersTypeEspecialty, updateNewFiltersTypeMenuDishOfTheDay, updateNewFiltersTypeNameOfTheRestaurant, updateNewFiltersTypeOpenedRestaurant } from "../redux/features/newFiltersType/newFiltersType";
import { useNavigation } from "@react-navigation/native";
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
  const menuDishOfTheDay = useSelector(
    (state) => state.newFilterTypeFeature.menu_dish_of_the_day
  );
  const completeMenu = useSelector(
    (state) => state.newFilterTypeFeature.complete_menu
  );
  const especialty = useSelector(
    (state) => state.newFilterTypeFeature.especialty
  );
  const nameOfTheRestaurant = useSelector(
    (state) => state.newFilterTypeFeature.name_of_the_restaurant
  );
  const openedRestaurant = useSelector(
    (state) => state.newFilterTypeFeature.opened_restaurant
  );

  const navigation = useNavigation();

  console.log("current", typesOfSearch)
  const rbSheetRef = useRef();

  const applyFilters = () => {
    console.log({
      is_open: openedRestaurant,
      lng: String(coords.longitude),
      lag: String(coords.latitude),
      distance: distanceValue,
      characteristics: selectedCharacteristics,
      menu_dish_of_the_day: menuDishOfTheDay,
      complete_menu: completeMenu,
      especialty: especialty,
      name_of_the_restaurant: nameOfTheRestaurant,
    });
    RestaurantService.filterRestaurant({
      is_open: openedRestaurant,
      lng: String(coords.longitude),
      lag: String(coords.latitude),
      distance: distanceValue,
      characteristics: selectedCharacteristics,
      menu_dish_of_the_day: menuDishOfTheDay,
      complete_menu: completeMenu,
      especialty: especialty,
      name_of_the_restaurant: nameOfTheRestaurant,
    })
      .then((res) => {
        {
          dispatch(setFilteredRestaurants(res.data));
          dispatch(setFiltersIsActive(true))

          if (res.data.length === 0) {
            // Toast.show({
            //   type: "info",
            //   visibilityTime: 3000,
            //   text1: "Nenhum restaurante encontrado",
            //   text1Style: { fontSize: 14 },
            //   text2Style: { fontSize: 10 },
            //   text2: "Filtro automaticamente removidos para mostrar resultados",
            //   position: "bottom",
            //   autoHide: true,
            //   onHide: () => {
            //     dispatch(setFilteredRestaurants(allRestaurants));
            //   }
            // });
            navigation.navigate("NoRestaurants");
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
    dispatch(setFiltersIsActive(false));
    dispatch(updateNewFiltersTypeMenuDishOfTheDay(false));
    dispatch(updateNewFiltersTypeCompleteMenu(false));
    dispatch(updateNewFiltersTypeEspecialty(false));
    dispatch(updateNewFiltersTypeNameOfTheRestaurant(false));
    dispatch(updateNewFiltersTypeOpenedRestaurant(false));
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
            <Text style={{ fontWeight: 800 }}>Filtros</Text>
          </View>

          <View style={styles.modalBody}>

            <Text style={{ fontWeight: "bold", marginTop: 5 }}>
              Tipo de pesquisa
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
              <Text style={{ flex: 1 }}>Pesquisar em menu de prato do dia </Text>
              <SwitchFilters typeFilter={"menu_dish_of_the_day"} />
            </View>

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
              <Text style={{ flex: 1 }}>Pesquisar em menu completo </Text>
              <SwitchFilters typeFilter={"complete_menu"} />
            </View>

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
              <Text style={{ flex: 1 }}>Pesquisar em especialidade </Text>
              <SwitchFilters typeFilter={"especialty"} />
            </View>

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
              <Text style={{ flex: 1 }}>Pesquisar pelo nome do restaurante </Text>
              <SwitchFilters typeFilter={"name_of_the_restaurant"} />
            </View>

            {/* <Text
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
            </View> */}

            {/* <View
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
            </View> */}

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
                Caracteristicas do Restaurante
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
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Outros critérios
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
                <Text style={{ flex: 1 }}>Mostrar apenas restaurantes abertos </Text>
                <SwitchFilters typeFilter={"opened_restaurant"} />
              </View>
            </View>

            {/* <View
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
            </View> */}

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
