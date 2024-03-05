import { View, Text, Image, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function MarkerIconComponent({ selectedRestaurant, itemName }) {

  const animationMarker = useRef(new Animated.Value(0)).current
  const currentRestaurantMarker = useSelector((state) => state.currentRestaurantMarker);

  useEffect(() => {
    if (currentRestaurantMarker == itemName) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animationMarker, {
            toValue: -20, // Move up
            duration: 500,
            easing: Easing.out(Easing.quad), // This easing function controls the pace of the animation
            useNativeDriver: true,
          }),
          Animated.timing(animationMarker, {
            toValue: 0, // Move back down
            duration: 500,
            easing: Easing.in(Easing.quad), // This easing function makes the down motion smooth
            useNativeDriver: true,
          }),
        ])
      ).start()
    } else {
      Animated.timing(animationMarker, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start()
    }
  }, [currentRestaurantMarker]);

  return (
    <>
      <View style={{ height: 50, justifyContent: "flex-end", alignItems: "flex-end", display: "flex" }}>
        <Animated.Image
          style={{ width: 30, height: 30, transform: [
            {
              translateY: animationMarker
            },
          ], }}
          source={require("../../assets/pin.png")}
          resizeMode="contain"
        />
      </View>
    </>
  );
}
