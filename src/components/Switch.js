import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";

const SwitchOpenOrClose = ({ isOpen, setIsOpen, updateFilteredSearch }) => {
  const toggleSwitch = () => {
    setIsOpen((previousState) => !previousState);
    updateFilteredSearch();
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#f9f9f9", true: "black" }}
        thumbColor={isOpen ? "white" : "white"}
        ios_backgroundColor="#f9f9f9"
        onValueChange={toggleSwitch}
        value={isOpen}
        style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-startr",
    justifyContent: "flex-start",
    width: "auto",
    height: "auto",
    marginLeft: 10,
  },
});

export default SwitchOpenOrClose;
