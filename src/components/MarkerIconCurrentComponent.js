import { View, Text, Image } from "react-native";
import React from "react";

export default function MarkerIconCurrentComponent() {
  return (
    <>
      <View style={{}}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require("../../assets/CurrentLocation.png")}
          resizeMode="contain"
        />
      </View>
    </>
  );
}
