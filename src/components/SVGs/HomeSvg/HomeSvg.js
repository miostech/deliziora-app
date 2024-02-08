import { View, Text, Image } from "react-native";
import React from "react";

export default function HomeSvg({ focused }) {
  const colors = require("../../../style/Colors.json");
  const png = require("../../../../assets/Home_IconNavigationBar.png");
  const pngFocused = require("../../../../assets/Home_IconNavigationBarFocused.png");
  if (focused) {
    return <Image source={pngFocused} style={{ width: 28, height: 28 }} />
  } else {
    return <Image source={png} style={{ width: 28, height: 28 }} />
  }
}
