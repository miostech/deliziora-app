import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, FlatList } from "react-native";
import { useSelector } from "react-redux";
import {
  MenuOfTheDayService,
  MenuService,
} from "deliziora-client-module/client-web";
import { Image } from "react-native";

const MenuOfDay = () => {
  const currentId = useSelector((state) => state.profilePage.currentId);
  const [platesOfTheDay, setPlatesOfTheDay] = useState([]);

  const PratoDoDia = require("../../../assets/DishDay.png");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().getDay(); // Get the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

        // Fetch menu of the day for the current restaurant and current day
        const responseMenuOfTheDay =
          await MenuOfTheDayService.returnAllMenuOfDayByRestaurant(currentId);

        if (
          responseMenuOfTheDay &&
          responseMenuOfTheDay.data &&
          responseMenuOfTheDay.data.length > 0
        ) {
          // Filter menu items for the current day and current restaurant
          const menuItems = responseMenuOfTheDay.data.filter(
            (item) => item.day === today
          );

          // Fetch menu details for the filtered menu items
          const menuIds = menuItems.map((item) => item.id_menu);
          const responseMenuItems = await MenuService.returnAllMenu();
          const filteredMenuItems = responseMenuItems.data.filter((item) =>
            menuIds.includes(item._id.$oid)
          );

          setPlatesOfTheDay(filteredMenuItems);
        } else {
          console.log(
            "No menu available for this restaurant on the current day."
          );
          setPlatesOfTheDay([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentId]);

  return (
    <ScrollView style={styles.container}>
      {platesOfTheDay.length > 0 ? (
        platesOfTheDay.map((plate, index) => (
          <View key={index} style={styles.plateContainer}>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
            }}>
              {plate.menu_complete ? (
                <>
                  <Image source={PratoDoDia} style={{ width: 24, height: 24 }} />
                </>
              ) : (
                <></>
              )}
              <Text style={styles.text}>{plate.name}</Text>
            </View>
            <Text style={styles.text}>€{plate.price}</Text>
          </View>
        ))
      ) : (
        <Text>Não há pratos disponíveis para o dia atual.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "35%",
    overflow: "scroll",
  },
  plateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    justifySelfent: "flex-start",
    fontWeight: "400",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
  },
});

export default MenuOfDay;
