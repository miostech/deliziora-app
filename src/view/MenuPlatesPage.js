import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  SectionList,
  FlatList,
} from "react-native";
import Loader from "../components/Loader";
import MeatIcon from "../components/SVGs/MeatIcon";
import FishIcon from "../components/SVGs/FishIcon";
import VegeterianIcon from "../components/SVGs/VegetarianIcon";
import { Divider } from "@rneui/base";
const Colors = require("../style/Colors.json");

const DATA = [
  {
    title: "Carne",
    data: [
      {
        food: "Carne",
        price: "10",
      },
      {
        food: "Carne",
        price: "10",
      },
      {
        food: "Carne",
        price: "10",
      },
    ],
  },
  {
    title: "Peixe",
    data: [
      {
        food: "Peixe",
        price: "10",
      },
      {
        food: "Peixe",
        price: "10",
      },
      {
        food: "Peixe",
        price: "10",
      },
    ],
  },
  {
    title: "Vegetariano",
    data: [
      {
        food: "Vegetariano",
        price: "10",
      },
      {
        food: "Vegetariano",
        price: "10",
      },
      {
        food: "Vegetariano",
        price: "10",
      },
    ],
  },
];

export default function MenuPlatesPage({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef();
  const [restaurant, setRestaurant] = useState(route.params.restaurant)

  useEffect(() => {
    console.log("OPEN", MenuPlatesPage.name, "SCREEN");

    /* console.log("PLATE",route.params.namePlate) */
    /* console.log("PLATE",sectionRef) */
    setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    return () => {
      console.log("SCREEN", MenuPlatesPage.name, "CLOSE");
    };
  }, [sectionRef]);

  const onLayoutRootView = useCallback(async () => {
    if (isLoading) {
    }
  }, [isLoading]);
  if (!isLoading) {
    return <Loader />;
  }
  const Item = ({ item }) => {
    return (
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 20,
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15 }}>{item.food}</Text>
        <Text style={{ fontSize: 15 }}>€{item.price}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styleSelected.backgroundPrimary, { flex: 1 }]}
      onLayout={onLayoutRootView}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, marginBottom: 10 }}
        enabled={true}
        behavior={Platform.OS == "android" ? "height" : "padding"}
        keyboardVerticalOffset={Platform.OS == "android" ? -150 : -150}
      >
        <View style={{ justifyContent: "center", alignItems: "center" , marginTop: 20}}>
          <Text style={{
            color: 'var(--neutral-02-color-neutral-01, #201F23)',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontSize: '26px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
          }}>{restaurant.title}</Text>

          <Divider
            style={{ width: "80%", margin: 20 }}
            color="black"
            insetType="left"
            subHeaderStyle={{}}
            width={1}
            orientation="horizontal"
          />
        </View>
        <View style={[styleSelected.backgroundPrimary, { flex: 1 }]}>
          <SectionList
            sections={DATA}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={({ section }) => (
              <>
                <View>

                  <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    <Text>
                      {section.title === "Carne" && <MeatIcon width={100} height={100} />}
                      {section.title === "Peixe" && <FishIcon width={100} height={100} />}
                      {section.title === "Vegetariano" && <VegeterianIcon width={100} height={100} />}
                    </Text>
                    <Text
                      style={{
                        padding: 10,
                        fontWeight: "bold",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 20

                      }}
                    >

                      {section.title}
                    </Text>
                  </View>
                </View>


                <FlatList
                  data={section.data}
                  renderItem={({ item }) => <Item item={item} />}
                />
              </>
            )}
            renderItem={({ item }) => { }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styleSelected = StyleSheet.create({
  backgroundPrimary: {
    backgroundColor: Colors.colors.neutral02Color.neutral_10,
  },
});
