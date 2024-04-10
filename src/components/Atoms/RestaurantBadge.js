import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

const RestaurantBadge = () => {
  const filteredRestaurants = useSelector((state) => state.restaurants.filteredRestaurants);
  const [restaurantCount, setRestaurantCount] = useState(0);

  useEffect(() => {
    setRestaurantCount(filteredRestaurants.length);
  }, [filteredRestaurants]);

  useEffect(() => {
    if (restaurantCount > 0) {
      Toast.show({
        text1Style: {
          color: '#f36527',
          fontWeight: 'bold',
          fontSize: 12,
          marginRight: 5,
        },
        text1: `Atualmente, há ${restaurantCount} restaurantes disponíveis.`,
        visibilityTime: 5000,
        type: "info",
        position: 'top',
      });
    }
  }, [restaurantCount]);

  return (
    null
  );
};


export default RestaurantBadge;
