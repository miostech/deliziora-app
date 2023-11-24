import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const colors = require("../style/Colors.json");
const Characteristics = [
  { label: "Peixe", name: "Peixe" },
  { label: "Carne", name: "Carne" },
  { label: "Vegetariano", name: "Vegetariano" },
];
const FoodFilterCarousel = () => {
  const [selectedCharacteristics, setSelectedCharacteristics] = useState(Characteristics.map(characteristic => ({ ...characteristic, isActive: true })));
  console.log(selectedCharacteristics);

  const handleCharacteristicPress = (characteristic) => {
    setSelectedCharacteristics(selectedCharacteristics.map(item => {
      if (item.name === characteristic.name) {
        return { ...item, isActive: !item.isActive };
      }
      return item;
    }));
  };

  return (
    <View style={styles.container}>
      {selectedCharacteristics.map((characteristic, index) => (
        <Pressable
          key={index}
          style={({ pressed }) => [
            styles.ButtonSelectCharacteristics,
            {
              borderWidth: characteristic.isActive ? 1 : 1,
              borderColor: characteristic.isActive ? colors.colors.neutral02Color.neutral_10 : colors.colors.neutral02Color.neutral_02,
              opacity: pressed ? 0.5 : 1,
              backgroundColor: characteristic.isActive ? colors.colors.neutral02Color.neutral_02 : colors.colors.neutral02Color.neutral_10,
            },
          ]}
          onPress={() => handleCharacteristicPress(characteristic)}
        >
          <Text
            style={[
              styles.TextButtonSelectCharacteristics,
              {
                color: characteristic.isActive ? colors.colors.neutral02Color.neutral_10 : colors.colors.neutral02Color.neutral_02
              },
            ]}
          >
            {characteristic.label}
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
  ButtonSelectCharacteristics: {
    padding: 18,
    width: "100px",
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #000',
  },
  TextButtonSelectCharacteristics: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoodFilterCarousel;