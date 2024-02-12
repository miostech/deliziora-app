import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  SafeAreaView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { RestaurantService } from "deliziora-client-module/client-web";
import Loader from "../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Device from "expo-device";

export default function RestaurantList({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [favoritesSelected, setFavorites] = useState([]);

  const fetchData = async () => {
    try {
      // Concurrently fetch favorites and restaurant data
      const [favoritesString, restaurantResponse] = await Promise.all([
        AsyncStorage.getItem("@favorites"),
        RestaurantService.returnAllRestaurants(),
      ]);

      const favoritesArray = favoritesString ? JSON.parse(favoritesString) : [];
      setFavorites(favoritesArray);

      const allRestaurants = restaurantResponse.data;
      const filteredData = allRestaurants.filter((restaurant) =>
        favoritesArray.includes(restaurant._id.$oid)
      );

      setData(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {
        setData([]);
      };
    }, [])
  );

  var colors = require("../style/Colors.json");

  useEffect(() => {
    console.log("OPEN", RestaurantList.name, "SCREEN");

    setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    return () => {
      console.log("SCREEN", RestaurantList.name, "CLOSE");
      setFavorites([]);
      setData([]);
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
      <Pressable
        style={{
          marginVertical: 8,
          marginHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 24,
          padding: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
        }}
        onPress={() =>
          navigation.navigate("ProfileRestaurantPage", {
            restaurant: item,
          })
        }
      >
        <Image
          source={{ uri: item.img }}
          style={{ width: 90, height: 80, borderRadius: 10 }}
        />
        <View>
          <Text style={{ fontSize: 15 }}>{item.name}</Text>
          <Text style={{ fontSize: 15 }}>Xkm de Distancia</Text>
        </View>
        <View>
          <Image
            key={index}
            source={require("../../assets/FavoriteSelected1.png")}
            style={styleSelected.dishImage}
          />
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView
      style={[styleSelected.backgroundPrimary, { flex: 1, marginTop: Device.brand == "Apple" ? 0 : 45 }]}
      onLayout={onLayoutRootView}
    >
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <KeyboardAvoidingView
        style={{ flex: 1, marginBottom: 10 }}
        enabled={true}
        behavior={Platform.OS == "android" ? "height" : "padding"}
        keyboardVerticalOffset={Platform.OS == "android" ? -150 : -150}
      >
        <View
          style={[styleSelected.backgroundPrimary, { flex: 1 }]}
        >
          <View style={{ alignItems: "center" }}>
            {/* <SearchBar isfilter={false} islistType={false} /> */}
            <Text style={{ fontSize: 15 }}>Meus favoritos</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <Item item={item} index={index} />
              )}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styleSelected = StyleSheet.create({
  dishImage: {
    width: 30,
    height: 30,
  },
});
