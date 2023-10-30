import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, FlatList } from "react-native";
import Carousel from "react-native-snap-carousel";

const colors = require("../style/Colors.json");

const countries = [
  { name: "Italiana", value: "italian" },
  { name: "Japonesa", value: "Japanese" },
  { name: "Chinesa", value: "chinese" },
  { name: "Americana", value: "american" },
  { name: "Francesa", value: "french" },
  { name: "Mexicana", value: "mexican" },
  { name: "Brasileira", value: "brazilian" },
  { name: "Espanhola", value: "spanish" },
  { name: "Portuguesa", value: "portuguese" },
  { name: "Coreana", value: "korean" },
  { name: "Australiana", value: "australian" },
  { name: "Indiana", value: "indian" },
  { name: "Thai", value: "thai" },
  { name: "Vietnamita", value: "vietnamese" },
  { name: "Arabe", value: "arabic" },
  { name: "Turca", value: "turkish" },
  { name: "Egipcia", value: "egyptian" },
  { name: "Russa", value: "russian" },
  { name: "Polonesa", value: "polish" },
  { name: "Sueca", value: "swedish" },
  { name: "Irlandesa", value: "irish" },
];

const FoodFilterCarousel = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleItemPress = (selectedType) => {
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(selectedType)) {
        // Remove the selected type if it's already in the array
        return prevSelectedTypes.filter((type) => type !== selectedType);
      } else {
        // Add the selected type if it's not in the array
        return [...prevSelectedTypes, selectedType];
      }
    });
  };

  const RenderItem = ({ item }) => {
    const isSelected = selectedTypes.includes(item.value);
    const itemStyle = isSelected ? styles.selectedItem : styles.item;
    const nameStyle = isSelected ? styles.selectedName : styles.name;
    return (
      <Pressable style={itemStyle} onPress={() => handleItemPress(item.value)}>
        <Text style={nameStyle}>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={countries}
        renderItem={({ item }) => <RenderItem item={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: 48,
  },
  item: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 13,
    textAlign: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.colors.neutral02Color.neutral_02,
  },
  selectedItem: {
    padding: "13px, 18px, 13px, 18px ",
    width: 100,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.colors.neutral02Color.neutral_02,
    color: colors.colors.neutral02Color.neutral_10,
  },
  selectedTypes: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 16,
    textAlign: "center",
    color:"black"
  },
  selectedName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.colors.neutral02Color.neutral_10,
  },
});

export default FoodFilterCarousel;
