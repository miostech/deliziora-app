import {
  AnonymousUserLocationService,
  AnonymousUserService,
} from "deliziora-client-module/client-web";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuid4 } from "uuid";
import * as Device from "expo-device";
import { Image, SafeAreaView, Text, View } from "react-native";
import * as Location from "expo-location";
import { BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrRemoveFavorits,
} from "../redux/features/restaurants/restaurantsSlice";
import { useNavigation } from "@react-navigation/native";
import { updateLocation } from "../redux/features/locationSlice/locationSlice";
import { setAllFavoritesRestaurants } from "../redux/features/restaurantsFavorites/restaurantsFavoritesSlice";

const gif = require("../../assets/SplashDelizioragif.gif");
export default function SplashScreen() {
  const location = useSelector((state) => state.location);
  const navigation = useNavigation();
  const [storedData, setStoredData] = useState("");
  const [currentLatitude, setcurrentLatitude] = useState("");
  const [currentLongitude, setcurrentLongitude] = useState("");
  const [regionDataResponse, setRegionDataResponse] = useState({});
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

  function getStatusLocation() {
    return new Promise(async (res, rej) => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        res(status);
      } catch (error) {
        rej(error);
      }
    });
  }

  function getCurrentLocationDevice() {
    return new Promise(async (res, rej) => {
      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        console.log(
          "AQUII",
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
        res(currentLocation);
        // dispatch(
        //   updateLocation({
        //     latitude: currentLocation.coords.latitude,
        //     longitude: currentLocation.coords.longitude,
        //   })
        // );
      } catch (error) {
        rej(error);
      }
    });
  }

  function checkFirstTimeApp() {
    return new Promise(async (res, rej) => {
      const user = await AsyncStorage.getItem("@userData");
      res(user);
    });
  }
  function checkFirstTimeAppFav() {
    return new Promise(async (res, rej) => {
      const user = await AsyncStorage.getItem("@favoriteRestaurants");
      res(user);
    });
  }
  
  //AsyncStorage.removeItem("@favoriteRestaurants")

  useEffect(() => {
    const id = uuid4();
    checkFirstTimeAppFav().then((res) => {
      console.warn("FAVORITOS", res);
      if (res) dispatch(setAllFavoritesRestaurants(res));
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
        navigation.navigate("HomeTab", { screen: "Map" });
      }
    });

    //   if (status === "granted") {
    //     console.log(location);
    //     AsyncStorage.getItem("@userData").then((response) => {
    //       console.log(response);
    //       if (response == undefined || response == null) {
    //         fetch(
    //           `https://json.geoapi.pt/gps/${currentLocation.coords.latitude},${currentLocation.coords.longitude}`,
    //           {
    //             headers: {
    //               Accept: "application/json",
    //             },
    //           }
    //         )
    //           .then((response) => {
    //             if (!response.ok) {
    //               throw new Error("Network response was not ok");
    //             }
    //             return response.json();
    //           })
    //           .then((data) => {
    //             // Work with the JSON data here
    //             console.log("DEU CERTO", data);
    //             setRegionDataResponse(data);
    //             AsyncStorage.getItem("@favoriteRestaurants").then(
    //               (response) => {
    //                 console.warn(response);
    //                 if (response !== null) {
    //                   dispatch(
    //                     setAllFavoritesRestaurants(JSON.parse(response))
    //                   );
    //                 }
    //               }
    //             );
    //           })
    //           .catch((error) => {
    //             console.error(
    //               "There was a problem with your fetch operation:",
    //               error
    //             );
    //           });
    //         AnonymousUserService.addAnonymousUser({
    //           uuid: id,
    //           created_at: "",
    //           device_name: Device.brand,
    //         })
    //           .then((res) => {
    //             console.log(res.data);
    //             console.log({
    //               district: regionDataResponse.distrito
    //                 ? regionDataResponse.distrito
    //                 : "",
    //               county: regionDataResponse.concelho
    //                 ? regionDataResponse.concelho
    //                 : "",
    //               parish: regionDataResponse.freguesia
    //                 ? regionDataResponse.freguesia
    //                 : "",
    //               latitude: location.location.latitude,
    //               longitude: location.location.longitude,
    //               created_at: "",
    //             });
    //             AnonymousUserLocationService.createNewUserLocation({
    //               id_anonymous_user: res.data,
    //               district: regionDataResponse.distrito
    //                 ? regionDataResponse.distrito
    //                 : "",
    //               county: regionDataResponse.concelho
    //                 ? regionDataResponse.concelho
    //                 : "",
    //               parish: regionDataResponse.freguesia
    //                 ? regionDataResponse.freguesia
    //                 : "",
    //               latitude: location.location.latitude,
    //               longitude: location.location.longitude,
    //               created_at: "",
    //             })
    //               .then((responseLoc) => {
    //                 AsyncStorage.setItem("@userData", res.data);
    //                 setTimeout(() => {
    //                   navigation.reset({
    //                     index: 0,
    //                     routes: [{ name: "Walkthrough" }],
    //                   });
    //                 }, 2900);
    //               })
    //               .catch((err) => console.error("ERRO", err));
    //           })
    //           .catch((err) => {
    //             console.error(err);
    //           });
    //       } else {
    //         navigation.navigate("HomeTab", { screen: "Map" });
    //       }
    //     });
    //   }
    // })();
  }, [dispatch, navigation]);

  /* Bloco modificado para testar solução de bug  */

  // Using BackHandler to navigate to a specific screen when the hardware back button is pressed

  useEffect(() => {
    const onBackPress = () => {
      // Replace 'HomeTab' with the name of the screen you want to navigate to
      navigation.navigate("HomeTab");
      return true; // Prevent default behavior (going back)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

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
