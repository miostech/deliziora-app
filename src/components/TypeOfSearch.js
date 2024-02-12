import React from "react";
import { View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOption } from "../redux/features/typesOfSearchSlice/typesOfSearchSlice";

const TypeOfSearch = () => {
  const dropdownOptions = [
    { label: "Menu completo + prato do dia", value: "option1" },
    { label: "Especialidade apenas", value: "option2" },
    { label: "Todos", value: "option3" },
  ];

  const selectedOption = useSelector((state) => state.typesOfSearch.selectedOption);
  const dispatch = useDispatch();

  const handleValueChange = (value) => {
    dispatch(setSelectedOption(value));
    console.log("Redux state Storage Type of menu :" + value);
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        items={dropdownOptions}
        placeholder={{ label: "Selecione uma opção", value: null }}
        onValueChange={handleValueChange}
        style={pickerSelectStyles}
        value={selectedOption || "option1"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    width: 330,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    alignSelf: "flex-start",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    borderWidth: 0.5,
    width: 330,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

export default TypeOfSearch;
