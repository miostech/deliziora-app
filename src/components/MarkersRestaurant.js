import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Marker } from "react-native-maps";
import MarkerIconComponent from "./MarkerIconComponent";
import CarouselContext from "./CarouselContext";

export default function MarkersRestaurant({ restaurants }) {
  const { changeSlide } = useContext(CarouselContext);
  const handleChangeSlide = (slideIndex) => {
    changeSlide(slideIndex); 
  };
  return (
    <>
      {restaurants.map((item) => {
        return (
          <Marker
            key={item.title}
            identifier="restaurant"
            draggable={true}
            onDrag={(e) => {
              console.log(e.nativeEvent?.coordinate);
            }}
            onPress={(e) => {
              handleChangeSlide(e._dispatchInstances._debugOwner.index);
              console.log(
                "nome do restaurante",
                e._dispatchInstances._debugOwner.key
              );
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
