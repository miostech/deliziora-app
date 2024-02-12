// markersSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const markersSlice = createSlice({
  name: 'markers',
  initialState: {
    restaurants: [],
  },
  reducers: {
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    // Add other reducers as needed
  },
});

export const { setRestaurants } = markersSlice.actions;

export const selectRestaurants = (state) => state.markers.restaurants;

export default markersSlice.reducer;
