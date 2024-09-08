import React from "react";
import { View, Text } from "react-native";

export default function NoRestaurants() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    fontFamily: "Roboto",
                    fontSize: 16,
                    fontWeight: "600",
                    lineHeight: 19,
                    letterSpacing: 0,
                    textAlign: "center",
                    margin: 20,
                }}
            >
                Não encontrámos restaurantes perto de si.
            </Text>
        </View>
    );
}