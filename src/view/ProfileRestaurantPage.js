import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  ScrollView,
  ScrollViewBase,
  Linking,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  CharacteristicsService,
  RestaurantService,
} from "deliziora-client-module/client-web";
import ArrowLeft from "../components/SVGs/ArrowLeft/ArrowLeft";
import { useNavigation } from "@react-navigation/native";
import { Path, Svg } from "react-native-svg";
import { Divider, Image } from "react-native-elements";
import MenuOfDay from "../components/Atoms/MenuOfDay";
import LoadingPageScreen from "./LoadingPageScreen";
import RestaurantIsOpenOrClosed from "../components/Atoms/RestaurantIsOpenOrClosed";
import { addCurrentRestaurant } from "../redux/features/currentRestaurantSelected/currentRestaurantSelectedSlice";
import PhoneIcon from "../components/PhoneIcon";

import MapLocationPageIcon from "../components/SVGs/MapLocationPageIcon/MapLocationPageIcon";
import InfoIcon from "../components/InfoIcon";
import RBSheet from "react-native-raw-bottom-sheet";
import { InfoToast } from "react-native-toast-message";
import DishDay from "../components/SVGs/DishDay";
import Close from "../components/SVGs/Close";
export default function ProfileRestaurantPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentLocation = useSelector((state) => state.location.location);
  const [restaurantData, setRestaurantData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // Estado de favorito
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // Estado de exibição de descrição
  const [filteredChars, SetFilteredChars] = useState([]);
  const currentId = useSelector((state) => state.profilePage.currentId);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const rbSheetRef = useRef();

  function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c; // Distance in km
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  var distance = getDistanceFromLatLon(
    currentLocation.latitude,
    currentLocation.longitude,
    restaurantData?.latitude,
    restaurantData?.longitude
  );

  useEffect(() => {
    RestaurantService.returnRestaurantById(currentId)
      .then((response) => {
        console.log("RESTAURANTE", response.data);
        setRestaurantData(response.data);
        dispatch(addCurrentRestaurant(response.data));
        CharacteristicsService.returnAllCharacteristics()
          .then((responseChar) => {
            console.log("CHARACTERISTICS", responseChar.data);
            console.log(restaurantData);
            const newArrayChars = responseChar.data
              .filter((item) =>
                response.data.characteristics.includes(item._id.$oid)
              )
              .map((item) => ({ icon: item.icon, name: item.name }));
            console.log("ARRAY CHARACTERISTICS", newArrayChars);
            SetFilteredChars(newArrayChars);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const url = `https://www.google.com/maps/search/?api=1&query=${restaurantData?.latitude},${restaurantData?.longitude}`;

  if (loading) {
    return <LoadingPageScreen />;
  }
  if (error) {
    return (
      <View>
        <Text>Erro: {error.message}</Text>
      </View>
    );
  }
  if (!restaurantData) {
    return (
      <View>
        <Text>Nenhum dado do restaurante encontrado.</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 150,
          backgroundColor: "var(--Neutral-02-Color-Neutral-02, #29272D)",
        }}
      >
        <Image
          source={{ uri: restaurantData.img }}
          resizeMode="cover"
          style={{ width: "100%", height: 150 }}
        />
      </View>
      <ScrollView
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 10,
          height: "100%",
          width: "90%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View
          style={{
            alignSelf: "center",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            width: "80%",
          }}
        >
          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              marginBottom: 15,
              gap: 20,
            }}
            onPress={() => Linking.openURL(url)}
          >
            <View style={{ width: 30 }}>
              <MapLocationPageIcon />
            </View>
            <View style={{ width: "85%", alignItems: "center" }}>
              <Text
                style={{
                  color: "var(--Neutral-02-Color-Neutral-04, #48464A)",
                  fontFamily: "Roboto",
                  fontSize: 16,
                  fontStyle: "normal",
                  fontWeight: "600",
                  maxWidth: "100%"
                }}
                lineBreakMode="tail"
                numberOfLines={1}
              >
                {restaurantData.address}
              </Text>
              <Text style={{ alignSelf: "center" }}>
                {"("}
                {distance < 1
                  ? (distance * 1000).toFixed(0) + "m"
                  : distance.toFixed(2) + "km"}{" "}
                de distancia{")"}
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              width: "100%",
              marginBottom: 10,
            }}
            onPress={() => Linking.openURL(`tel:${restaurantData.contact}`)}
          >
            <View style={{ width: 30 }}>
              <PhoneIcon />
            </View>

            <View style={{ justifyContent: "center", width: "85%", alignItems: "center" }}>
              <Text
                style={{
                  color: "var(--Neutral-02-Color-Neutral-04, #48464A)",
                  textAlign: "center",
                  fontFamily: "Roboto",
                  fontSize: 16,
                  fontStyle: "normal",
                  width: "100%",
                  fontWeight: "600",
                }}
              >
                {restaurantData.contact}
              </Text>
            </View>
          </Pressable>

          <RestaurantIsOpenOrClosed />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Pressable
              onPress={() => {
                rbSheetRef.current.open();
              }}
            >
              <View style={{ width: 30 }}>
                <InfoIcon />
              </View>
            </Pressable>

            <FlatList
              data={filteredChars}
              style={{
                height: 50,
                alignSelf: "center",
              }}
              renderItem={({ item }) => (
                <View style={{ height: "100%", justifyContent: "center" }}>
                  <Image
                    source={{ uri: item.icon }}
                    style={{ width: 32, height: 32 }}
                  />
                </View>

              )}
              contentContainerStyle={{
                gap: 20,
                justifyContent: "center",
                width: "100%"
              }}
              keyExtractor={(item) => item.toString()}
              horizontal={true}
            />
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            minWidth: "100%",
            maxWidth: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "justify",
              fontFamily: "Roboto",
              fontSize: 16,
              fontStyle: "normal",
              fontWeight: "300",
            }}
          >
            {isDescriptionExpanded
              ? restaurantData.description
              : `${restaurantData.description.substring(0, 50)}...`}
          </Text>
          <Pressable
            onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            style={{
              width: 300,
              height: 50,
              backgroundColor: "black",
              marginTop: 20,
              marginBottom: 20,
              alignSelf: "center",
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Roboto",
                fontSize: 16,
                fontStyle: "normal",
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              {isDescriptionExpanded ? "Ver menos" : "Ver mais"}
            </Text>
          </Pressable>
        </View>
        <ScrollView
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "100%",
            maxHeigh: 200,
            gap: 5,
            marginBottom: 5,
          }}
        >
          <View style={{
            marginBottom: 10,
          }}>
            <Text
              style={{
                color: "var(--Neutral-02-Color-Neutral-01, #201F23)",
                fontFamily: "Roboto",
                fontSize: 18,
                fontStyle: "normal",
                fontWeight: "bold",
              }}
            >
              Especialidade
            </Text>
          </View>
          <View style={{
            marginBottom: 10,
          }}><Text
            style={{
              color: "var(--Neutral-02-Color-Neutral-01, #201F23)",
              fontFamily: "Roboto",
              fontSize: 16,
              fontStyle: "normal",
              fontWeight: "300",
            }}
          >
              {restaurantData.especialty}
            </Text>
          </View>
          <Text
            style={{
              color: "var(--Neutral-02-Color-Neutral-01, #201F23)",
              fontFamily: "Roboto",
              fontSize: 18,
              fontStyle: "normal",
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Prato do Dia
          </Text>
          <MenuOfDay />
          <Pressable
            style={{
              width: 300,
              height: 50,
              backgroundColor: "black",
              marginTop: 20,
              marginBottom: 20,
              alignSelf: "center",
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("MenuPlatesPage");
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontFamily: "Roboto",
                fontSize: 16,
                fontStyle: "normal",
                fontWeight: "300",
              }}
            >
              Ver Menu
            </Text>
          </Pressable>
        </ScrollView>
      </ScrollView>
      <RBSheet
        ref={rbSheetRef}
        openDuration={250}
        dragFromTopOnly
        closeOnDragDown
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
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
        <ScrollView style={styles.scrollView}>
          <Pressable onPress={() => rbSheetRef.current.close()} style={{
            width: 30,
            height: 30,
            position: "absolute",
            top: 10,
            right: 0,
          }}>
            <Close />
          </Pressable>
          <View style={styles.modalHeader}>
            <FlatList
              data={filteredChars}
              style={{
                width: "100%",
                padding: 5,
                height: "100%",
                marginTop: 40,
                overflow: "scroll"
              }}
              renderItem={({ item }) => (
                <>
                  <View style={{ minWidth: "100%", display: "flex", alignItems: "center", flexDirection: "row", gap: 20 }}>
                    <Image
                      source={{ uri: item.icon }}
                      style={{ width: 60, height: 60 }}
                    />
                    <Text>{item.name}</Text>
                  </View>
                  <Divider />
                </>
              )}
              contentContainerStyle={{
                gap: 20,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",

              }}
              keyExtractor={(item) => item.toString()}
            />
          </View>
        </ScrollView>
      </RBSheet>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
  },
  text2: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
  },
  scrollView: {
    flexGrow: 1,
    width: "90%",
  },
  modalHeader: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
