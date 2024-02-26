// restaurantsSlice.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allRestaurants: [],
  favoriteRestaurants: [],
  allRestaurantsOpen: [],
};

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setAllRestaurants(state, action) {
      state.allRestaurants = action.payload;
    },
    setAllRestaurantsOpen(state, action) {
      state.allRestaurantsOpen = action.payload;
    },
    // addToFavorites(state, action) {
    //   const { restaurantId } = action.payload;
    //   if (!state.favoriteRestaurants.includes(restaurantId)) {
    //     // state.favoriteRestaurants?.push(restaurantId);
    //     console.warn("LIST", state.favoriteRestaurants);
    //     var restFav = [];
    //     restFav = [...state.favoriteRestaurants, restaurantId];
    //     state.favoriteRestaurants = restFav;
    //   }
    //   AsyncStorage.setItem("@favoriteRestaurants", JSON.stringify(restFav));
    //   return state;
    // },
    // removeFromFavorites(state, action) {
    //   const { restaurantId } = action.payload;
    //   state.favoriteRestaurants = state.favoriteRestaurants.filter(
    //     (id) => id !== restaurantId
    //   );
    //   AsyncStorage.setItem(
    //     "@favoriteRestaurants",
    //     JSON.stringify(state.favoriteRestaurants)
    //   );
    // },
    
  },
});

export const {
  setAllRestaurants,
  addToFavorites,
  removeFromFavorites,
  setAllRestaurantsOpen,
} = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
