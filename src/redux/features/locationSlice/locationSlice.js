// reducers/locationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: null,
  errorMsg: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    updateLocation(state, action) {
      state.location = action.payload;
      state.errorMsg = null; // Limpar mensagem de erro, se houver
    },
    setLocationError(state, action) {
      state.errorMsg = action.payload;
    },
  },
});

export const { updateLocation, setLocationError } = locationSlice.actions;

export default locationSlice.reducer;
