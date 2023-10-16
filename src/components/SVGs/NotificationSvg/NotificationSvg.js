import { View, Text, Image } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

export default function NotificationSvg({focused}) {
  const png = require("../../../../assets/notificationPng.png");
  const pngFocused = require("../../../../assets/notificationPngFocused.png");
  if(focused){
    return <Image  source={pngFocused} style={{ width:30, height:30}}/>
  }else{
    return <Image  source={png} style={{ width:30, height:30}}/>
  }
}
