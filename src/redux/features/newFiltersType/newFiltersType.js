import { createSlice } from '@reduxjs/toolkit';

export const newFilterTypeFeature = createSlice({
    name: 'newFilterTypeFeature',
    initialState: {
        menu_dish_of_the_day: false,
        complete_menu: false,
        especialty: false,
        name_of_the_restaurant: false,
        opened_restaurant: false,
    },
    reducers: {
        updateNewFiltersTypeMenuDishOfTheDay: (state, action) => {
            console.log("action", action.payload);
            state.menu_dish_of_the_day = action.payload;
            console.log("state", state);
            return state;
        },
        updateNewFiltersTypeCompleteMenu: (state, action) => {
            state.complete_menu = action.payload;
        },
        updateNewFiltersTypeEspecialty: (state, action) => {
            state.especialty = action.payload;
        },
        updateNewFiltersTypeNameOfTheRestaurant: (state, action) => {
            state.name_of_the_restaurant = action.payload;
        },
        updateNewFiltersTypeOpenedRestaurant: (state, action) => {
            state.opened_restaurant = action.payload;
        },
        updateNewFiltersTypeValues: (state, action) => {
            state.menu_dish_of_the_day = action.payload.menu_dish_of_the_day;
            state.complete_menu = action.payload.complete_menu;
            state.especialty = action.payload.especialty;
            state.name_of_the_restaurant = action.payload.name_of_the_restaurant;
        }
    },
});

export const { updateNewFiltersTypeCompleteMenu, updateNewFiltersTypeEspecialty, updateNewFiltersTypeMenuDishOfTheDay, updateNewFiltersTypeNameOfTheRestaurant, updateNewFiltersTypeOpenedRestaurant, updateNewFiltersTypeValues } = newFilterTypeFeature.actions;

export default newFilterTypeFeature.reducer;
