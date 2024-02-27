import React from "react";
import { View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedOption } from "../redux/features/typesOfSearchSlice/typesOfSearchSlice";

const TypeOfSearch = () => {
  const dropdownOptions = [
    { label: "Menu completo + prato do dia", value: "complete_menu" },
    { label: "Especialidade apenas", value: "especialty" },
    { label: "Todos", value: "all" },
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
        placeholder={{ label: "Selecione uma opção" }}
        onValueChange={handleValueChange}
        style={pickerSelectStyles}
        value={selectedOption}
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
    width: 330,
    borderRadius: 4,
    borderColor: "black",
    borderWidth: 0.5,
    color: "black",
    alignSelf: "flex-start",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "black",
    width: 330,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

export default TypeOfSearch;
