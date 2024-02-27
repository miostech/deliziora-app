import { createSlice } from '@reduxjs/toolkit';

export const restaurantCurrentProfilePageSlice = createSlice({
  name: 'restaurantCurrentProfilePage',
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {
    setRestaurantData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setRestaurantData, setLoading, setError } = restaurantCurrentProfilePageSlice.actions;

export default restaurantCurrentProfilePageSlice.reducer;
