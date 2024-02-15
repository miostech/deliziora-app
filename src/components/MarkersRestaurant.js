import React, { useEffect, useRef } from "react";
import { Marker, AnimatedRegion } from "react-native-maps";
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurants, setRestaurants } from './../redux/features/markers/markersSlice';
import MarkerIconComponent from "./MarkerIconComponent";
import { RestaurantService } from "deliziora-client-module/client-web";

export default function MarkersRestaurant() {
  const dispatch = useDispatch();
  const restaurants = useSelector(selectRestaurants);
  const mapRef = useRef(null);

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
    // Aqui você pode chamar uma função para centralizar o mapa na coordenada do restaurante selecionado
    if (mapRef.current && restaurants[index]) {
      const { latitude, longitude } = restaurants[index];
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
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
