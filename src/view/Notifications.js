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

export default function Notifications() {
  const colors = require("../style/Colors.json");

  const items = [
    {
      id: 1,
      title: "Yum Tree",
      text: "Lorem ipsum dolor sit amet leo consectetur. Mus magna sit vel leo",
      date: "20 de outubro de 2023 ás 10:00",
    },
    {
      id: 2,
      title: "Yum Tree",
      text: "Lorem ipsum dolor sit amet leo consectetur. Mus magna sit vel leo",
      date: "20 de outubro de 2023 ás 10:00",
    },
    {
      id: 3,
      title: "Yum Tree",
      text: "Lorem ipsum dolor sit amet leo consectetur. Mus magna sit vel leo",
      date: "20 de outubro de 2023 ás 10:00",
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
      <View style={{alignItems: "center"}}>
        <Text>Notificações</Text>
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
                <Text style={{ fontSize: 18, marginBottom: 7 }}>{item.title}</Text>
                <Text style={{ fontSize: 12, marginBottom: 7 }}>{item.date}</Text>
                <Text style={{ fontSize: 16 }}>{item.text}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
