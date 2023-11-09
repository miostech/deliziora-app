import React from "react";
import { Text, View } from "react-native";

export default function Loader(){
    return(
        <View style={{height: "100%", width: "100%", justifyContent: "center", alignItems: "center"}}>
            <Text>Loading</Text>
        </View>
    )
}