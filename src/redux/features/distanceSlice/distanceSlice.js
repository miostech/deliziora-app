import { createSlice } from '@reduxjs/toolkit';

export const distanceSlice = createSlice({
    name: 'distance',
    initialState: {
        value: 100000,
    },
    reducers: {
        updateDistance: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { updateDistance } = distanceSlice.actions;

export default distanceSlice.reducer;
