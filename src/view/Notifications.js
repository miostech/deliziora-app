import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import React from "react";
import * as Device from "expo-device";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function Notifications() {
  const colors = require("../style/Colors.json");

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

  const items = [
    {
      id: 1,
      title: "Bem-vindo ao app TelaBite!",
      text: "Aqui pode ver a lista de notificações da aplicação TelaBite!",
      date: new Date().toLocaleString('pt-PT'),
    },
  ];

  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
        marginTop: Device.brand === "Apple" ? 0 : 45,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
          marginTop: 15,
          marginBottom: 15,
        }}>Notificações</Text>
      </View>
      {/* <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 16,
          marginTop: 40,
          marginBottom: 15,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View style={{}}>
          <TouchableOpacity>
            <ArrowLeft />
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: "15%" }}>
          <Text style={{ fontSize: 19 }}>Quadro de Notificações</Text>
        </View>
      </View> */}
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {items.map((item) => (
            <TouchableWithoutFeedback>
              <View
                key={item.id}
                style={{
                  backgroundColor: "#fff",
                  shadowColor: "#000000",
                  shadowOpacity: 0.4,
                  shadowRadius: 2,
                  shadowOffset: {
                    height: 1,
                    width: 1,
                  },
                  elevation: 5,
                  borderRadius: 8,
                  padding: 20,
                  margin: 20,
                }}
              >
                <Text style={{ fontSize: 18, marginBottom: 7 }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 12, marginBottom: 7 }}>
                  {item.date}
                </Text>
                <Text style={{ fontSize: 16 }}>{item.text}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
