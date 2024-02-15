// profilePageSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const profilePageSlice = createSlice({
  name: 'profilePage',
  initialState: {
    currentId: null,
  },
  reducers: {
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
  },
});

export const { setCurrentId } = profilePageSlice.actions;

export default profilePageSlice.reducer;
