// MarkersRestaurant.js

import React, { useEffect } from "react";
import { Marker } from "react-native-maps";
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurants, setRestaurants } from './../redux/features/markers/markersSlice';
import MarkerIconComponent from "./MarkerIconComponent";
import { RestaurantService } from "deliziora-client-module/client-web";

export default function MarkersRestaurant() {
  const dispatch = useDispatch();
  const restaurants = useSelector(selectRestaurants);

  useEffect(() => {
    RestaurantService.returnAllRestaurants()
      .then((res) => {
        dispatch(setRestaurants(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [dispatch]);

  const handleChangeSlide = (index) => {
    // Dispatch actions or perform other logic as needed
    console.log("Slide index:", index);
  };

  const handleMarkerPress = (coordinate, restaurantName) => {
    // Dispatch actions or perform other logic as needed
    console.log("Marker pressed at:", coordinate);
    console.log("Restaurant name:", restaurantName);
  };

  return (
    <>
      {restaurants.map((item, index) => (
        <Marker
          key={item.name}
          identifier="restaurant"
          draggable={false}
          onDrag={false}
          onPress={() => handleMarkerPress(item.coordinate, item.name)}
          coordinate={{
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
          }}
        >
          <MarkerIconComponent />
        </Marker>
      ))}
    </>
  );
}
