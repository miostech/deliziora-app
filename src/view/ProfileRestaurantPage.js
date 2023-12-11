import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import { Linking } from "react-native";
import * as Device from "expo-device";
import moment from "moment";
import Close from "../components/SVGs/Close";
import PhoneIcon from "../components/PhoneIcon";
import GoogleMapsIcon from "../components/GoogleMapsIcon";
import StarIcon from "../components/SVGs/StarIcon";
import { Button } from "react-native-elements";
import { CharacteristicsService } from "deliziora-client-module/client-web";
const Colors = require("../style/Colors.json");

export default function ProfileRestaurantPage({ route, navigation }) {

  const [showMore, setShowMore] = useState(false);
  const [restaurant, setRestaurant] = useState(route.params.restaurant);
  const [location, setLocation] = useState(route.params.location);
  const [modalVisible, setModalVisible] = useState(false);
  const [characteristics, setCharacteristics] = useState([]);

  useEffect(() => {
    CharacteristicsService.returnAllCharacteristics(restaurant.id)
      .then((data) => {
        setCharacteristics(data.data);
        console.log("characteristics", data);
      })
      .catch((error) => {
        console.error("ERRO", error);
      });
  }, [restaurant.id]);

  const getOpeningHoursForCurrentDay = () => {
    const currentDay = moment().format("dddd").toLowerCase();
    console.log(currentDay);
    if (restaurant.opening_hours && restaurant.opening_hours[currentDay]) {
      return restaurant.opening_hours[currentDay];
    }
    return "Horário não disponível para o dia atual";
  };

  const currentOpeningHours = getOpeningHoursForCurrentDay();

  const isRestaurantOpen = () => {
    const currentTime = moment().format("HH:mm");
    console.log(open);
    console.log(currentTime);
    console.log(currentOpeningHours);
    const { open, closed } = currentOpeningHours;

    if (currentTime <= closed && currentTime >= open) {
      return "Aberto";
    } else {
      return "Fechado";
    }
  };

  const restaurantStatus = isRestaurantOpen();

  const coordinatesNavigateGoogle = `https://www.google.com/maps/dir/?api=1&origin=${location?.coords.latitude},${location?.coords.longitude}&destination=${restaurant?.latitude},${restaurant?.longitude}&travelmode=driving`;

  const plates = [
    { price: 20, name: "Prato 1" },
    { price: 20, name: "Prato 2" },
    { price: 20, name: "Prato 3" },
    { price: 20, name: "Prato 4" },
  ];

  /*  const handleItemPress = (e) => {
     console.log("PLATE", e);
     navigation.navigate("MenuPlatesPage", {
       namePlate: e,
     });
   }; */


  const RenderItem = ({ item, index }) => {
    const itemStyle = styles.item;
    const nameStyle = styles.itemName;
    return (
      <View
        style={{
          marginRight: 10,
          justifyContent: "space-between",
          flexDirection: "row",
          width: 330,
          borderBottomWidth: 1,
          marginBottom: 20,
        }}
      >
        <Text style={nameStyle}>{item.name}</Text>
        <Text style={nameStyle}>€{item.price}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={restaurant.image} style={styles.imageRestaurant} />
      </View>
      <ScrollView
        vertical={true}
        showsHorizontalScrollIndicator={false}
        style={styles.containerRestaurantInfo}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.restaurantTitleInfo}>
          <Text style={styles.textRestaurantTitleInfo}>{restaurant.name}</Text>
          <View
            style={[
              {
                marginBottom: 15,
                marginTop: 15,
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: 330,
              },
            ]}
          >
            <View style={[styles.row, { alignItems: "center" }]}>
              <View style={styles.phoneNumberCall}>
                <Pressable
                  onPress={() => {
                    Linking.openURL(coordinatesNavigateGoogle);
                  }}
                >
                  <GoogleMapsIcon />
                </Pressable>
              </View>
              <Text style={styles.textRestaurantNormalInfo}>
                {restaurant.address}
              </Text>
            </View>
            <View style={[styles.row, { alignItems: "center" }]}>
              <View style={styles.phoneNumberCall}>
                <Pressable
                  onPress={() => {
                    Linking.openURL(`tel:${restaurant.contact}`);
                  }}
                >
                  <PhoneIcon />
                </Pressable>
              </View>
              <Text
                style={[
                  styles.textRestaurantNormalInfo,
                  { marginLeft: 50 },
                ]}
              >
                {restaurant.contact}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.restaurantDistanceInfo]}>

          <View style={styles.restaurantDistanceContent}>
            <Text style={[styles.textRestaurantNormalInfo, styles.bold]}>
              {currentOpeningHours.open} - {currentOpeningHours.closed}
            </Text>
            <View style={[styles.row]}>
              <Text style={styles.textRestaurantNormalInfo}>Horario</Text>
              <Text style={styles.textRestaurantNormalInfo}>-</Text>
              <Text
                style={[
                  styles.textRestaurantNormalInfo,
                  {
                    color: restaurantStatus === "Aberto" ? "green" : "red",
                    fontWeight: "bold",
                  },
                ]}
              >
                {restaurantStatus}

              </Text>
            </View>
          </View>
          <View style={styles.restaurantDistanceContent}>
            <Text style={[styles.textRestaurantNormalInfo, styles.bold]}>
              1km
            </Text>
            <Text style={styles.textRestaurantNormalInfo}>Distancia</Text>
          </View>
        </View>
        <View style={[styles.row, styles.imageAccessContainer]}>
          <View style={styles.row}>
            {characteristics.map((characteristic) => (
              <View key={characteristic.id} style={styles.characteristicItem}>
                {/* Renderizar o ícone da característica (substitua 'iconeDaCaracteristica' pelo ícone real) */}
                <Image source={characteristic.icon} style={styles.characteristicIcon} />

                {/* Exibir o nome da característica */}
                <Text style={styles.characteristicName}>{characteristic.name}</Text>
              </View>
            ))}
          </View>

        </View>

        <View style={styles.aboutContainer}>
          <Text
            style={[
              styles.textRestaurantNormalInfo,
              { fontWeight: "bold", fontSize: 18 },
            ]}
          >
            Sobre
          </Text>
          <View style={styles.aboutContent}>
            <Text style={styles.textRestaurantNormalInfo}>
              {showMore
                ? restaurant.description
                : restaurant.description.slice(0, 50) + "..."}
            </Text>
            {!showMore && (
              <Pressable
                onPress={() => setShowMore(!showMore)}
                style={{
                  backgroundColor: Colors.colors.neutral02Color.neutral_01,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 5,
                  width: "100%",
                  padding: 10,
                }}
              >
                <Text style={{ color: "white" }}>Ver Mais</Text>
              </Pressable>
            )}
            {showMore && (
              <Pressable
                onPress={() => setShowMore(!showMore)}
                style={{
                  backgroundColor: Colors.colors.neutral02Color.neutral_01,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 5,
                  width: "100%",
                  padding: 10,
                }}
              >
                <Text style={{ color: "white" }}>Ver Menos</Text>
              </Pressable>
            )}
          </View>
        </View>
        <View
          style={{
            marginBottom: 15,
            marginTop: 15,
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "left",
            }}
          >
            Especialidade
          </Text>
        </View>
        <View style={styles.specialityContainer}>
          <StarIcon width={35} height={35} />
          <Text
            style={[
              styles.textRestaurantNormalInfo,
              {
                fontWeight: "normal",
                fontSize: 20,
                textAlign: "center",
              },
            ]}
          >
            {restaurant.especialty}
          </Text>
        </View>
        <View style={styles.platesContainer}>
          <Text
            style={[
              styles.textRestaurantNormalInfo,
              {
                fontWeight: "bold",
                fontSize: 18,
                marginBottom: 10,
                textAlign: "left",
              },
            ]}
          >
            Pratos do Dia
          </Text>
          <View style={{}}>
            <FlatList
              vertical
              data={plates}
              renderItem={({ item, index }) => (
                <RenderItem item={item} index={index} />
              )}
              showsHorizontalScrollIndicator={false}
            />
            <View>
              <Pressable
                style={{
                  backgroundColor: Colors.colors.neutral02Color.neutral_01,
                  borderRadius: 100,
                  marginBottom: 25,
                }}
                onPress={() => {
                  navigation.navigate("MenuPlatesPage", {
                    restaurant: restaurant,
                  });
                }}
              >
                <Text
                  style={{
                    color:
                      Device.brand == "Apple"
                        ? Colors.colors.neutral02Color.neutral_10
                        : Colors.colors.neutral02Color.neutral_10,
                    textAlign: "center",
                    padding: 10,
                  }}
                >
                  Ver Menu Completo
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 50,
  },
  specialityContainer: {
    alignSelf: "flex-start",
    gap: 10,
    paddingTop: 20,
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  containerRestaurantInfo: {
    flex: 1,
    backgroundColor: Colors.colors.neutral02Color.neutral_10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 150,
    height: "100%",
    padding: 10,
  },
  restaurantTitleInfo: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 35,
    borderBottomColor: "grey",
  },
  textRestaurantTitleInfo: { fontSize: 22, fontWeight: "bold" },
  textRestaurantNormalInfo: { fontSize: 16 },
  restaurantDistanceInfo: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 35,
    gap: 30,
  },
  restaurantDistanceContent: { justifyContent: "center", alignItems: "center" },
  image: {
    width: 65,
    height: 80,
  },
  imageRestaurant: {
    width: "100%",
    position: "absolute",
  },
  imageAccessContainer: {
    gap: 20,
  },
  aboutContainer: {
    marginTop: 35,
    gap: 10,
  },
  platesContainer: { marginTop: 35, flex: 1 },
  itemName: {
    fontWeight: "bold",
  },
  item: {},
  phoneNumberCall: {
    margin: 10,
  },
  AddressButton: {
    margin: 10,
  },
  aboutContent: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bold: {
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: Colors.colors.neutral02Color.neutral_10,
    position: "absolute",
    height: "60%",
    width: "80%",
    top: 200,
    right: 40,
    borderRadius: 20,
  },
  modalContent: {
    padding: 15,
    paddingLeft: 0,
    paddingRight: 0,
  },
  modalMenuTitle: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 35,
    paddingBottom: 20,
    width: "100%",
  },
  modalContentMenu: {
    width: "100%",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 35,
    paddingBottom: 35,
  },
  modalContentMenuBox: {
    marginBottom: 23,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
});
