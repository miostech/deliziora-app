import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Keyboard,
} from "react-native";
import InterfaceessentialMagnifier from "./SVGs/InterfaceessentialMagnifier/InterfaceessentialMagnifier";
import { FilterSearch } from "./FilterSearch";

export default function SearchBar2({
  searchTerm,
  setSearchTerm,
  handleSearch,
}) {
  const handleKeyPress = () => {
    handleSearch();
    Keyboard.dismiss();
  };
  return (
    <View style={styles.searchBar2}>
      <View style={styles.content}>
        <Pressable
          style={styles.searchicon}
          onPress={() => {
            handleSearch();
            Keyboard.dismiss();
          }}
        >
          <View style={styles.interfaceessentialMagnifier}>
            <InterfaceessentialMagnifier />
          </View>
        </Pressable>
        <TextInput
          style={styles.placeholderLabel}
          placeholder="Pesquisar"
          value={searchTerm}
          onEndEditing={handleKeyPress}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar2: {
    flexShrink: 0,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    rowGap: 10,
    flexDirection: "row",
  },
  content: {
    alignSelf: "stretch",
    flexShrink: 0,
    height: 56,
    width: "70%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 9,
    shadowColor: "rgb(0, 0, 0)",
    shadowOpacity: 0.05,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 32,
  },
  searchicon: {
    flexShrink: 0,
    height: 24,
    width: 24,
    alignItems: "flex-start",
    rowGap: 0,
  },
  interfaceessentialMagnifier: {
    position: "absolute",
    flexShrink: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transform: [
      {
        rotateZ: "-90.00deg",
      },
    ],
    alignItems: "flex-start",
    rowGap: 0,
  },
  icon: {
    position: "absolute",
    flexShrink: 0,
    top: 2,
    right: 2,
    bottom: 2,
    left: 3,
    overflow: "visible",
  },
  placeholderLabel: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: "left",
    color: "rgba(60, 60, 67, 0.6)",
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "400",
    letterSpacing: 0,
  },
  filterButton: {
    flexShrink: 0,
    height: 56,
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 9,
    shadowColor: "rgb(0, 0, 0)",
    shadowOpacity: 0.05,
  },
});
