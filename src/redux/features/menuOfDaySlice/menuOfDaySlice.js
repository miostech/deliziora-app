import { createSlice } from "@reduxjs/toolkit";

export const menuOfDaySlice = createSlice({
  name: "menuOfDay",
  initialState: {},
  reducers: {
    setMenuOfDay: (state, action) => {
      state = action.payload;
      console.log("REDUX", state)
      return state;
    },
  },
});

export const { setMenuOfDay } = menuOfDaySlice.actions;

export default menuOfDaySlice.reducer;
