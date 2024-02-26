// restaurantsSlice.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const restaurantsFavoritesSlice = createSlice({
  name: "restaurantsFavorites",
  initialState: [],
  reducers: {
    setAllFavoritesRestaurants(state, action) {
      console.warn("REDUX SETALLFAVORITES", action.payload);
      state = action.payload;
    },
    addOrRemoveFavorits(state, action) {
      const { restaurantId } = action.payload;
      console.log("REDUX addOrRemoveFavorits STATE", state);
      console.log("REDUX addOrRemoveFavorits ACTION", action);

      state.push(restaurantId);

      AsyncStorage.setItem("@favoriteRestaurants", JSON.stringify(state));
      return state;
    },

    removeFavoritsNew(state, action) {
      const { restaurantId } = action.payload;
      console.log("REDUX addOrRemoveFavorits STATE", state);
      console.log("REDUX addOrRemoveFavorits ACTION", action);

      console.warn("REMOVE FAVORITWS", restaurantId);

      state = state.filter((f) => f != restaurantId);
      AsyncStorage.setItem("@favoriteRestaurants", JSON.stringify(state));
      return state
    },
  },
});

export const {
  addOrRemoveFavorits,
  removeFavoritsNew,
  setAllFavoritesRestaurants,
} = restaurantsFavoritesSlice.actions;

export default restaurantsFavoritesSlice.reducer;
