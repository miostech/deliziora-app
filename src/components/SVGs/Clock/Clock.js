import React from "react";
import { View } from "react-native";
import { Svg, Path } from "react-native-svg";

export default function ArrowLeft() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock-hour-4" width="30" height="30" viewBox="0 0 24 24" stroke-width="3" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <Path d="M12 12l3 2" />
      <Path d="M12 7v5" />
    </Svg>
  );
}
