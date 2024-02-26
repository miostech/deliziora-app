// reducers/locationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: {
    latitude: 0,
    longitude: 0,
  },
  errorMsg: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    updateLocation(state, action) {
      console.warn(action.payload);
      console.log("BANANANA", action.payload)
      state.location.latitude = action.payload.location.latitude;
      state.location.longitude = action.payload.location.longitude;
      state.errorMsg = null;
      console.warn(state,"here");
      return state
    },
    setLocationError(state, action) {

      state.errorMsg = action.payload;
    },
  },
});

export const { updateLocation, setLocationError } = locationSlice.actions;

export default locationSlice.reducer;
