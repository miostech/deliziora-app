import { View, Text, Image } from "react-native";
import React from "react";

export default function HomeSvg({ focused }) {
  const colors = require("../../../style/Colors.json");
  const png = require("../../../../assets/Favorites.png");
  const pngFocused = require("../../../../assets/FavoriteFocus.png");
  if (focused) {
    return <Image source={pngFocused} style={{ width: 28, height: 28 }} />
  } else {
    return <Image source={png} style={{ width: 28, height: 28 }} />
  }
}
