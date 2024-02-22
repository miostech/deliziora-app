
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { BackHandler, Dimensions, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import WalkthroughSlider from "../components/WalkthroughSlider";

export default function Walkthrough({ navigation }) {

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Do nothing when back button is pressed
        return true;
      };

      // Add event listener for hardware back press
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      // Clean up the event listener
      return () => backHandler.remove();
    }, [])
  );
  
  return (
    <View>
      <WalkthroughSlider navigation={navigation}/>
    </View>
  );
}
