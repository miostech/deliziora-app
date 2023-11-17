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
} from "react-native";

import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
const data = [
  {
    id: 1,
    image: require("../../assets/Restaurant1.png"),
    dishes: [
      require("../../assets/Dishe.png"),
      require("../../assets/Dishe.png"),
      require("../../assets/Dishe.png"),
    ],
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
    dishes: [
      require("../../assets/Dishe.png"),
      require("../../assets/Dishe.png"),
      require("../../assets/Dishe.png"),
    ],
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
    dishes: [
      require("../../assets/Dishe.png"),
      require("../../assets/Dishe.png"),
      require("../../assets/Dishe.png"),
    ],
    title: "Restaurant Name 3",
    description: "Restaurant description",
    address: "Jl, Raya Yeh gangga - n°61",
    contact: "911111112",
    coordinates: { latitude: 38.52981, longitude: -8.895425 },

    about:
      "Lorem ipsum dolor sit amet consectetur. Unc ullamcorper donec felis tincidunt sit.  Amet pulvinar aliquet donec non vitae accumsan amet fringilla. Venenatis proin elementum enim sed ut eu sit. Id vel dictu.",
  },
  
];

export default function RestaurantList({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  var colors = require("../style/Colors.json");

  useEffect(() => {
    console.log("OPEN", RestaurantList.name, "SCREEN");

    setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    return () => {
      console.log("SCREEN", RestaurantList.name, "CLOSE");
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
      <View
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
      >
        <Image
          source={item.image}
          style={{ width: 90, height: 80, borderRadius: 10 }}
        />
        <View>
          <Text style={{ fontSize: 15 }}>{item.title}</Text>
          <Text style={{ fontSize: 15 }}>Xkm de Distancia</Text>
        </View>
        <View>
          <Image
            key={index}
            source={require("../../assets/FavoriteSelected1.png")}
            style={styleSelected.dishImage}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={[styleSelected.backgroundPrimary, { flex: 1 }]}
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
          style={[styleSelected.backgroundPrimary, { flex: 1, paddingTop: 40 }]}
        >
          <View style={{}}>
            <SearchBar isfilter={false} islistType={false} />
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
