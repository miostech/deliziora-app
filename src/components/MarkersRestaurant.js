import { View, Text } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import MarkerIconComponent from "./MarkerIconComponent";

export default function MarkersRestaurant({ restaurants }) {
  return (
    <>
      {restaurants.map((item) => {
        return (
          <Marker
            key={"restaurant" + " " + item.id}
            identifier="restaurant"
            draggable={true}
            onDrag={(e) => {
              console.log(e.nativeEvent?.coordinate);
            }}
            coordinate={{
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
            }}
          >
            <MarkerIconComponent />
          </Marker>
        );
      })}
    </>
  );
}
