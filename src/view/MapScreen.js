import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";

export default function MapScreen() {
  return (
    <SafeAreaView>
      <View style={{width:"100%", height:"100%"}}>
        <Image style={{width:"100%", height:"100%"}} source={{uri: "https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg"}}/>
      </View>
    </SafeAreaView>
  );
}
