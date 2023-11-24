import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Close from "../components/SVGs/Close";
import { Linking } from "react-native";
import * as Device from "expo-device";
import PhoneIcon from "../components/PhoneIcon";
import MapSvg from "../components/SVGs/MapSvg/MapSvg";
import GoogleMapsIcon from "../components/GoogleMapsIcon";
import WazeIcon from "../components/WazeIcon";
const Colors = require("../style/Colors.json");

export default function ProfileRestaurantPage({ route, navigation }) {
  const [restaurant, setRestaurant] = useState(route.params.restaurant);
  const [location, setLocation] = useState(route.params.location);
  const [modalVisible, setModalVisible] = useState(false);
  var addressNavigateWaze = `https://www.waze.com/ul?ll=${restaurant?.coordinates.latitude}%2C${restaurant?.coordinates.longitude}&navigate=yes&zoom=17`;
  var coordinatesNavigateGoogle = `https://www.google.com/maps/dir/?api=1&origin=${location?.coords.latitude},${location?.coords.longitude}&destination=${restaurant?.coordinates.latitude},${restaurant?.coordinates.longitude}&travelmode=driving`;

  const image1 = require("../../assets/AccessAnimals.png");
  const image2 = require("../../assets/AccessCard.png");
  const image3 = require("../../assets/AccessChair.png");
  const image4 = require("../../assets/AccessGarage.png");

  const plate1 = require("../../assets/PlatesOfTheDay1.png");
  const plate2 = require("../../assets/PlatesOfTheDay2.png");
  const plate3 = require("../../assets/PlatesOfTheDay3.png");
  const plate4 = require("../../assets/PlatesOfTheDay4.png");

  const plates = [
    { price: 20, name: "Prato 1" },
    { price: 20, name: "Prato 2" },
    { price: 20, name: "Prato 3" },
    { price: 20, name: "Prato 4" },
  ];

  const handleItemPress = (e) => {
    console.log("PLATE", e);
    navigation.navigate("MenuPlatesPage", {
      namePlate: e,
    });
  };
  const RenderItem = ({ item, index }) => {
    const itemStyle = styles.item;
    const nameStyle = styles.itemName;
    return (
      <Pressable style={itemStyle} onPress={() => handleItemPress(index)}>
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
      </Pressable>
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
          <Text style={styles.textRestaurantTitleInfo}>{restaurant.title}</Text>

          <View
            style={[{ marginBottom: 15, marginTop: 15, alignItems: "flex-start", justifyContent:"space-around" }]}
          >
            <View style={[styles.row, { alignItems: "center" }]}>
              <View style={styles.phoneNumberCall}>
                <Pressable
                  onPress={() => {
                    Linking.openURL(addressNavigateWaze);
                  }}
                >
                  <WazeIcon />
                </Pressable>
              </View>
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
            <View style={[styles.row, { alignItems: "center", }]}>
              <View style={styles.phoneNumberCall}>
                <Pressable
                  onPress={() => {
                    Linking.openURL(`tel:${restaurant.contact}`);
                  }}
                >
                  <PhoneIcon />
                </Pressable>
              </View>
              <Text style={[styles.textRestaurantNormalInfo, {marginLeft:50}]}>
                {restaurant.contact}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.restaurantDistanceInfo]}>
          <View style={styles.restaurantDistanceContent}>
            <Text style={[styles.textRestaurantNormalInfo, styles.bold]}>
              240
            </Text>
            <Text style={styles.textRestaurantNormalInfo}>seguidores</Text>
          </View>
          <View style={styles.restaurantDistanceContent}>
            <Text style={[styles.textRestaurantNormalInfo, styles.bold]}>
              12h - 13h
            </Text>
            <View style={[styles.row]}>
              <Text style={styles.textRestaurantNormalInfo}>Horario</Text>
              <Text style={styles.textRestaurantNormalInfo}>-</Text>
              <Text
                style={[
                  styles.textRestaurantNormalInfo,
                  { color: "green", fontWeight: "bold" },
                ]}
              >
                Aberto
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
          <View>
            <Image source={image1} style={styles.image} />
          </View>
          <View>
            <Image source={image2} style={styles.image} />
          </View>
          <View>
            <Image source={image3} style={styles.image} />
          </View>
          <View>
            <Image source={image4} style={styles.image} />
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
          <Text style={styles.textRestaurantNormalInfo}>
            {restaurant.about}
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
                textAlign: "center",
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
                  navigation.navigate("MenuPlatesPage",{restaurant: restaurant });
                }}
              >
                <Text
                  style={{
                    color:
                      Device.brand == "Apple"
                        ? Colors.colors.neutral02Color.neutral_10
                        : Colors.colors.neutral01Color.neutral_10,
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
  bold: {
    fontWeight: "bold",
  },
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
  containerRestaurantInfo: {
    flex: 1,
    backgroundColor: Colors.colors.neutral02Color.neutral_10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 150,
    height: "100%",
    padding: 10,
  },
  containerModalInfo: {
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
    alignItems: "center",
    marginBottom: 35,
    gap: 30,
  },
  restaurantDistanceContent: { justifyContent: "center", alignItems: "center" },
  image: {
    width: 65,
    height: 80,
  },
  imagePlates: {
    width: 100,
    height: 100,
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
});
