import { AnonymousUserService } from "deliziora-client-module/client-web";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuid4 } from "uuid";
import * as Device from "expo-device";
import { Image, SafeAreaView, Text, View } from "react-native";

import { BackHandler } from 'react-native';
import { useDispatch } from "react-redux";
import { setAllFavoritesRestaurants } from "../redux/features/restaurants/restaurantsSlice";

const gif = require("../../assets/SplashDelizioragif.gif");
export default function SplashScreen({ navigation }) {
  const [storedData, setStoredData] = useState("");
  const dispatch = useDispatch();
  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem("userData", data);
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem("myKey");
      if (value !== null) {
        setStoredData(value);
        console.log(storedData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    const id = uuid4();
    AsyncStorage.getItem("@favoriteRestaurants").then((response) => {
      console.warn(response);
      if (response !== null) {
        dispatch(setAllFavoritesRestaurants(JSON.parse(response)));
      }
    })
    AsyncStorage.getItem("@userData").then((response) => {
      console.log(response);
      if (response == undefined || response == null) {
        AnonymousUserService.addAnonymousUser({
          uuid: id,
          created_at: "",
          device_name: Device.brand,
        })
          .then((res) => {
            console.log(res.data);
            AsyncStorage.setItem("@userData", res.data);
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Walkthrough" }],
              });
            }, 2900);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        navigation.navigate('HomeTab', { screen: 'Map' });
      }
    });
  }, []);


  /* Bloco modificado para testar solução de bug  */

  // Using BackHandler to navigate to a specific screen when the hardware back button is pressed

  useEffect(() => {
    const onBackPress = () => {
      // Replace 'HomeTab' with the name of the screen you want to navigate to
      navigation.navigate('HomeTab');
      return true; // Prevent default behavior (going back)
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => backHandler.remove(); // Clean up the event listener

  }, [navigation]);

  /* Bloco modificado para testar solução de bug  */
  return (
    <View>
      <Image
        source={gif}
        style={{ height: "100%", width: "100%" }}
        resizeMode={"cover"}
      />
    </View>
  );
}
