import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

export default function NotificationSvg() {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
      
        d="M20.324 14.0085C19.8989 13.6313 19 13.0802 19 12.5L19 10.0858C19 6.16579 16.229 3 12 3C7.77106 3 5 6.16579 5 10.0858L4.99999 12.5C5.00002 13.0802 4.1011 13.6313 3.67603 14.0085C2.23129 15.3482 3.25505 17.6308 5.30255 17.6308H8.93831H15.0617H18.6974C20.745 17.6308 21.7687 15.3482 20.324 14.0085Z"
        stroke="#48464A"
        stroke-width="2"
      />
      <Path
        d="M15 18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18"
        stroke="#48464A"
        stroke-width="2"
      />
    </Svg>
  );
}
