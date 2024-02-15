// slices/listTypeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const listTypeSlice = createSlice({
  name: 'listType',
  initialState: false,
  reducers: {
    setListType: (state, action) => action.payload
  }
});

export const { setListType } = listTypeSlice.actions;
export default listTypeSlice.reducer;
