import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteRestaurants: [],
  nonFavoriteRestaurants: [],
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const { id } = action.payload;
      const index = state.favoriteRestaurants.findIndex((restaurant) => restaurant.id === id);

      if (index !== -1) {
        state.favoriteRestaurants.splice(index, 1);
        state.nonFavoriteRestaurants.push(action.payload);
      } else {
        state.nonFavoriteRestaurants = state.nonFavoriteRestaurants.filter((restaurant) => restaurant.id !== id);
        state.favoriteRestaurants.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = restaurantSlice.actions;
export default restaurantSlice.reducer;
