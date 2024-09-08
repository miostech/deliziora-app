import React, { useEffect } from "react";
import { View, Switch, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe AsyncStorage
import { useSelector, useDispatch } from 'react-redux';
import { setOpenStatus } from './../redux/features/switchSlice/switchSlice'; // Importe a action corretamente
import { updateNewFiltersTypeCompleteMenu, updateNewFiltersTypeEspecialty, updateNewFiltersTypeMenuDishOfTheDay, updateNewFiltersTypeNameOfTheRestaurant, updateNewFiltersTypeOpenedRestaurant } from "../redux/features/newFiltersType/newFiltersType";

const SwitchFilters = ({typeFilter}) => {
    const openStatus = useSelector((state) => {
        if (typeFilter === 'menu_dish_of_the_day') {
            return state.newFilterTypeFeature.menu_dish_of_the_day
        }
        else if (typeFilter === 'complete_menu') {
            return state.newFilterTypeFeature.complete_menu
        }else if (typeFilter === 'especialty') {
            return state.newFilterTypeFeature.especialty
        }else if (typeFilter === 'name_of_the_restaurant') {
            return state.newFilterTypeFeature.name_of_the_restaurant
        }else if (typeFilter === 'opened_restaurant') {
            return state.newFilterTypeFeature.opened_restaurant
        }
    });
    const dispatch = useDispatch();

    const toggleSwitch = (value) => {
        console.log("value", value);
        if (typeFilter === 'menu_dish_of_the_day') {
            dispatch(updateNewFiltersTypeMenuDishOfTheDay(value));
        }
        else if (typeFilter === 'complete_menu') {
            dispatch(updateNewFiltersTypeCompleteMenu(value));
        }else if (typeFilter === 'especialty') {
            dispatch(updateNewFiltersTypeEspecialty(value));
        }else if (typeFilter === 'name_of_the_restaurant') {
            dispatch(updateNewFiltersTypeNameOfTheRestaurant(value));
        }else if (typeFilter === 'opened_restaurant') {
            dispatch(updateNewFiltersTypeOpenedRestaurant(value));
        }
    };

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: "#f9f9f9", true: "black" }}
                thumbColor={openStatus ? "white" : "white"}
                ios_backgroundColor="#f9f9f9"
                onValueChange={toggleSwitch}
                value={openStatus}
                style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "auto",
        height: "auto",
        marginLeft: 10,
    },
});

export default SwitchFilters;

