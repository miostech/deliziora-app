import { createSlice } from "@reduxjs/toolkit";

const typesOfSearchSlice = createSlice({
  name: "typesOfSearch",
  initialState: {
    selectedOption: "complete_menu",
  },
  reducers: {
    setSelectedOption(state, action) {
      state.selectedOption = action.payload;
    },
  },
});

export const { setSelectedOption } = typesOfSearchSlice.actions;

export default typesOfSearchSlice.reducer;
