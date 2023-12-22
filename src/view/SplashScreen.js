import { AnonymousUserService } from "deliziora-client-module/client-web";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuid4 } from "uuid";
import * as Device from "expo-device";
import { Image, SafeAreaView, Text, View } from "react-native";
const gif = require("../../assets/SplashDelizioragif.gif");
export default function SplashScreen({ navigation }) {
  const [storedData, setStoredData] = useState("");
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
