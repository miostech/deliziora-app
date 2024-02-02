import React from "react";
import { Svg, Path } from "react-native-svg";

export default function Info({ style }) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width="30" height="30" viewBox="0 0 24 24" strokeWidth="2" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" style={style} />
      <Path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <Path d="M12 9h.01" />
      <Path d="M11 12h1v4h1" />
    </Svg>
  );
}

