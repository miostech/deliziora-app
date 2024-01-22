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

import { RestaurantService } from "deliziora-client-module/client-web";


export default function ListMapRestaurant({ route, navigation, restaurants }) {
  const [isLoading, setIsLoading] = useState(true);
  
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
                source={{uri: item.img}}
                style={{ width: 90, height: 80, borderRadius: 10 }}
              />
            </View>
            <View style={{ display: "flex" }}>
              <Text style={{ fontSize: 18 , fontWeight: "bold" , marginBottom: 10}}>{item.name}</Text>
              <Text style={{ fontSize: 14 , flexWrap: "wrap", maxWidth: 200 ,  }}>{item.description.slice(0, 100) + "..."}</Text>
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
          data={restaurants}
          renderItem={({ item, index }) => <Item item={item} index={index} />}
        />
      </View>
    </SafeAreaView>
  );
}
const styleSelected = StyleSheet.create({
  backgroundPrimary: { marginTop: Device.brand === "Apple" ? 70 : 55, marginBottom: Device.brand === "Apple" ? 40 : 10 },
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
