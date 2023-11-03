import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Marker } from "react-native-maps";
import MarkerIconComponent from "./MarkerIconComponent";
import CarouselMapContext from "./CarouselMapContext";

export default function MarkersRestaurant({ restaurants }) {
  const { handleMarkerPress, changeSlide } = useContext(CarouselMapContext);
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
              handleChangeSlide(e._dispatchInstances._debugOwner.index, );
              console.log(e.nativeEvent.coordinate)
              console.log(
                "nome do restaurante",
                e._dispatchInstances._debugOwner.key
              );
            }}
            coordinate={{
              latitude: parseFloat(item.coordinates.latitude),
              longitude: parseFloat(item.coordinates.longitude),
            }}
          >
            <MarkerIconComponent />
          </Marker>
        );
      })}
    </>
  );
}
