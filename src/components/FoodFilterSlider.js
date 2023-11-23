import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const colors = require("../style/Colors.json");
const Categories = [
  { name: "Peixe", value: "Peixe" },
  { name: "Carne", value: "Carne" },
  { name: "Vegetariano", value: "Vegetariano" },
];
const FoodFilterCarousel = () => {
  const [selectedCategories, setSelectedCategories] = useState(Categories.map(category => ({ ...category, isSelected: true })));
  console.log(selectedCategories);

  const handlePress = (category) => {
    setSelectedCategories(selectedCategories.map(item => {
      if (item.value === category.value) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    }));
  };

  return (
    <View style={styles.container}>
      {selectedCategories.map((category, index) => (
        <Pressable
          key={index}
          style={({ pressed }) => [
            styles.ButtonSelectCatergories,
            {
              borderWidth: category.isSelected ? 1 : 1,
              borderColor: category.isSelected ? colors.colors.neutral02Color.neutral_10 : colors.colors.neutral02Color.neutral_02,
              opacity: pressed ? 0.5 : 1,
              backgroundColor: category.isSelected ? colors.colors.neutral02Color.neutral_02 : colors.colors.neutral02Color.neutral_10,
            },
          ]}
          onPress={() => handlePress(category)}
        >
          <Text
            style={[
              styles.TextButtonSelectCatergories,
              {
                color: category.isSelected ? colors.colors.neutral02Color.neutral_10 : colors.colors.neutral02Color.neutral_02
              },
            ]}
          >
            {category.name}
          </Text>
        </Pressable>
      ))}

    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
  ButtonSelectCatergories: {
    padding: 18,
    width: "100",
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #000',

  },
  TextButtonSelectCatergories: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoodFilterCarousel;