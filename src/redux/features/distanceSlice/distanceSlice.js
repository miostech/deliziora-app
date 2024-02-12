import { createSlice } from '@reduxjs/toolkit';

export const distanceSlice = createSlice({
    name: 'distance',
    initialState: {
        value: 1, // Valor inicial da distância
    },
    reducers: {
        updateDistance: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { updateDistance } = distanceSlice.actions;

export default distanceSlice.reducer;
