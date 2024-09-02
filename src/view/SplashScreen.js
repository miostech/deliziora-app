import {
  AnonymousUserLocationService,
  AnonymousUserService,
} from "deliziora-client-module/client-web";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuid4 } from "uuid";
import * as Device from "expo-device";
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native";
import * as Location from "expo-location";
import { BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addOrRemoveFavorits } from "../redux/features/restaurants/restaurantsSlice";
import { useNavigation } from "@react-navigation/native";
import { updateLocation } from "../redux/features/locationSlice/locationSlice";
import { setAllFavoritesRestaurants } from "../redux/features/restaurantsFavorites/restaurantsFavoritesSlice";

const gif = require("../../assets/SplashDelizioragif.gif");
export default function SplashScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function checkFirstTimeApp() {
    return new Promise(async (res, rej) => {
      const user = await AsyncStorage.getItem("@userData");
      res(user);
    });
  }
  function checkFirstTimeAppFav() {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await AsyncStorage.getItem("@favoriteRestaurants");
        console.warn("suerrr",user)
        if (user) {
          const favorites = JSON.parse(user); // Parse AsyncStorage data into array
          resolve(favorites);
        } else {
          resolve([]); // Resolve with an empty array if no favorites found
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  //AsyncStorage.removeItem("@favoriteRestaurants")

  useEffect(() => {
    const id = uuid4();
    checkFirstTimeAppFav()
      .then((res) => {
        console.warn("FAVORITOS", res);
        if (res) {
          dispatch(setAllFavoritesRestaurants(res));
        }
      })
      .catch((error) => {
        console.error("Error retrieving favorite restaurants:", error);
      });

    checkFirstTimeApp().then((response) => {
      if (response == undefined || response == null) {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Walkthrough" }],
          });
        }, 2900);
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeTab" }],
        });
      }
    });
  }, [dispatch, navigation, checkFirstTimeAppFav]);


  useEffect(() => {
    const onBackPress = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeTab" }],
      });
      return true; 
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => backHandler.remove(); 
  }, [navigation]);

  return (
    <View>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <Image
        source={gif}
        style={{ height: "100%", width: "100%" }}
        resizeMode={"cover"}
      />
    </View>
  );
}
