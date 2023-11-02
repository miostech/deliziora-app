import { View, Text, Image } from "react-native";
import React from "react";

export default function MarkerIconComponent() {
  return (
    <>
      <View style={{}}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require("../../assets/pin.png")}
          resizeMode="contain"
        />
      </View>
    </>
  );
}
