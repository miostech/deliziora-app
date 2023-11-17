import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  SafeAreaView,
  StatusBar,
  Appearance,
  useColorScheme,
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  Pressable,
} from "react-native";
import Loader from "../components/Loader";
import * as Device from "expo-device";
const Colors = require("../style/Colors.json");

const dataRestaurant = [
  {
    id: 1,
    image: require("../../assets/Restaurant1.png"),
    dishes: require("../../assets/Favorite1.png"),
    isFavorite: false,
    title: "Restaurant Name 1",
    description: "Restaurant description",
    address: "Jl, Raya Yeh gangga - n°65",
    contact: "911111111",
    coordinates: { latitude: 38.524319, longitude: -8.889212 },

    about:
      "Lorem ipsum dolor sit amet consectetur. Unc ullamcorper donec felis tincidunt sit.  Amet pulvinar aliquet donec non vitae accumsan amet fringilla. Venenatis proin elementum enim sed ut eu sit. Id vel dictu.",
  },
  {
    id: 2,
    image: require("../../assets/Restaurant1.png"),
    dishes: require("../../assets/Favorite1.png"),
    isFavorite: false,
    title: "Restaurant Name 2",
    description: "Restaurant description",
    address: "Jl, Raya Yeh gangga - n°63",
    contact: "911111444",
    coordinates: { latitude: 38.526971, longitude: -8.889441 },

    about:
      "Lorem ipsum dolor sit amet consectetur. Unc ullamcorper donec felis tincidunt sit.  Amet pulvinar aliquet donec non vitae accumsan amet fringilla. Venenatis proin elementum enim sed ut eu sit. Id vel dictu.",
  },
  {
    id: 3,
    image: require("../../assets/Restaurant1.png"),
    dishes: require("../../assets/Favorite1.png"),
    isFavorite: false,
    title: "Restaurant Name 3",
    description: "Restaurant description",
    address: "Jl, Raya Yeh gangga - n°61",
    contact: "911111112",
    coordinates: { latitude: 38.52981, longitude: -8.895425 },

    about:
      "Lorem ipsum dolor sit amet consectetur. Unc ullamcorper donec felis tincidunt sit.  Amet pulvinar aliquet donec non vitae accumsan amet fringilla. Venenatis proin elementum enim sed ut eu sit. Id vel dictu.",
  },
  {
    id: 4,
    image: require("../../assets/Restaurant1.png"),
    dishes: require("../../assets/Favorite1.png"),
    isFavorite: false,
    title: "Restaurant Name 4",
    description: "Restaurant description",
    address: "Jl, Raya Yeh gangga - n°66",
    contact: "911111333",
    coordinates: { latitude: 38.528576, longitude: -8.900009 },
    about:
      "Lorem ipsum dolor sit amet consectetur. Unc ullamcorper donec felis tincidunt sit.  Amet pulvinar aliquet donec non vitae accumsan amet fringilla. Venenatis proin elementum enim sed ut eu sit. Id vel dictu.",
  },
  {
    id: 5,
    image: require("../../assets/Restaurant1.png"),
    dishes: require("../../assets/Favorite1.png"),
    isFavorite: false,
    title: "Restaurant Name 5",
    description: "Restaurant description",
    address: "Jl, Raya Yeh gangga - n°66",
    contact: "911111333",
    coordinates: {
      latitude: 38.539908,
      longitude: -8.869396,
    },
    about:
      "Lorem ipsum dolor sit amet consectetur. Unc ullamcorper donec felis tincidunt sit.  Amet pulvinar aliquet donec non vitae accumsan amet fringilla. Venenatis proin elementum enim sed ut eu sit. Id vel dictu.",
  },
];

export default function ListMapRestaurant({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(dataRestaurant);

  const handleFavoriteToggle = (id) => {
    const updatedRestaurants = restaurant.map((restaurant) =>
      restaurant.id === id
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    );
    setRestaurant(updatedRestaurants);
  };

  useEffect(() => {
    console.log("OPEN", ListMapRestaurant.name, "SCREEN");
    //For test loading
    setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    return () => {
      console.log("SCREEN", ListMapRestaurant.name, "CLOSE");
    };
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (isLoading) {
    }
  }, [isLoading]);
  if (!isLoading) {
    return <Loader />;
  }
  const Item = ({ item, index }) => {
    return (
      <>
        <View
          style={{
            marginVertical: 12,
            marginHorizontal: 20,
            backgroundColor: "white",
            borderRadius: 24,
            justifyContent: "start",
            padding: 20,
            gap: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Image
                source={item.image}
                style={{ width: 90, height: 80, borderRadius: 10 }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 15 }}>{item.title}</Text>
              <Text style={{ fontSize: 15 }}>{item.description}</Text>
            </View>
            <View style={styleSelected.visitBox}>
              <View style={styleSelected.imageFavorite}>
                <Pressable
                  onPress={() => {
                    handleFavoriteToggle(item.id);
                  }}
                >
                  {item.isFavorite ? (
                    <Image
                      key={index}
                      source={require("../../assets/FavoriteSelected1.png")}
                      style={styleSelected.dishImage}
                    />
                  ) : (
                    <Image
                      key={index}
                      source={item.dishes}
                      style={styleSelected.dishImage}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styleSelected.visitButtonBox}>
            <Text style={{ fontSize: 15 }}>Xkm de distância</Text>
            <Pressable
              style={styleSelected.visitButton}
              onPress={() =>
                navigation.navigate("ProfileRestaurantPage", {
                  restaurant: item,
                })
              }
            >
              <Text
                style={{
                  color: Colors.colors.neutral02Color.neutral_10,
                  fontSize: 18,
                  fontFamily: "Roboto_400Regular",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Visitar
              </Text>
            </Pressable>
          </View>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView
      style={[styleSelected.backgroundPrimary]}
      onLayout={onLayoutRootView}
    >
      <View style={[styleSelected.backgroundPrimary]}>
        <FlatList
          data={restaurant}
          renderItem={({ item, index }) => <Item item={item} index={index} />}
        />
      </View>
    </SafeAreaView>
  );
}
const styleSelected = StyleSheet.create({
  backgroundPrimary: { marginTop: 45 },
  visitButtonBox:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"flex-end"
  },  
  visitButton: {
    backgroundColor: Colors.colors.neutral02Color.neutral_02,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 100,
  },
  dishImage: {
    width: 30,
    height: 30,
  },
  imageFavorite: {},
  visitBox: {
    alignItems: "center",
    gap: 10,
  },
});
