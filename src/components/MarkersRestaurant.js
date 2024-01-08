import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Marker } from "react-native-maps";
import MarkerIconComponent from "./MarkerIconComponent";
import CarouselMapContext from "./CarouselMapContext";
import { RestaurantService } from "deliziora-client-module/client-web";

export default function MarkersRestaurant() {
  const { handleMarkerPress, changeSlide } = useContext(CarouselMapContext);
  const [restaurants, setRestaurants] = useState([])
  const handleChangeSlide = (slideIndex) => {
    changeSlide(slideIndex); 
  };
  useEffect(() => {
    RestaurantService.returnAllRestaurants().then((res) => {
      setRestaurants(res.data);
    }).catch((err) => {
      console.error(err)
    })
  
  }, [])
  
  return (
    <>
      {restaurants.map((item) => {
        return (
          <Marker
            key={item.name}
            identifier="restaurant"
            draggable={false}
            onDrag={false}
            onPress={(e) => {
              handleChangeSlide(e._dispatchInstances._debugOwner.index, );
              console.log(e.nativeEvent.coordinate)
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
