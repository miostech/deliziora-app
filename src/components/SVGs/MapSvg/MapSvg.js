import { View, Text, Image } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

export default function MapSvg({ focused }) {
  const colors = require("../../../style/Colors.json");
  const png = require("../../../../assets/bx_bx-map-pin.png");
  const pngFocused = require("../../../../assets/bx_bx-map-pin-focused.png");
  if(focused){
    return <Image  source={pngFocused} style={{ width:35, height:35}}/>
  } else{
    return <Image  source={png} style={{ width:35, height:35}}/>
  }

  
}
