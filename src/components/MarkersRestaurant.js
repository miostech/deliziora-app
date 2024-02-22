import React, { useEffect, useRef } from "react";
import { Marker, AnimatedRegion } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRestaurants,
  setRestaurants,
} from "./../redux/features/markers/markersSlice";
import MarkerIconComponent from "./MarkerIconComponent";
import { RestaurantService } from "deliziora-client-module/client-web";

export default function MarkersRestaurant({ CarrouselRef }) {
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

  const handleMarkerPress = (index) => {
    CarrouselRef.current.snapToItem(index);
  };

  return (
    <>
      {restaurants.map((item, index) => (
        <Marker
          key={item.name}
          identifier="restaurant"
          draggable={false}
          onDrag={false}
          coordinate={{
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
          }}
          onPress={() =>
            handleMarkerPress(index)
          }
        >
          <MarkerIconComponent />
        </Marker>
      ))}
    </>
  );
}
