// restaurantsSlice.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";


const restaurantsFavoritesSlice = createSlice({
  name: "restaurantsFavorites",
  initialState: [],
  reducers: {
    setAllFavoritesRestaurants(state, action) {
      return action.payload;
    },
    addOrRemoveFavorits(state, action) {
      const { restaurantId } = action.payload;
      const newState = [...state, restaurantId]; // Add the new restaurantId to the state
      AsyncStorage.setItem("@favoriteRestaurants", JSON.stringify(newState)); // Update AsyncStorage
      return newState; // Return the new state
    },
    removeFavoritsNew(state, action) {
      const { restaurantId } = action.payload;
      const newState = state.filter((id) => id !== restaurantId); // Remove the restaurantId from the state
      AsyncStorage.setItem("@favoriteRestaurants", JSON.stringify(newState)); // Update AsyncStorage
      return newState; // Return the new state
    },
  },
});

export const {
  addOrRemoveFavorits,
  removeFavoritsNew,
  setAllFavoritesRestaurants,
} = restaurantsFavoritesSlice.actions;

export default restaurantsFavoritesSlice.reducer;
