// switchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const switchSlice = createSlice({
    name: 'switch',
    initialState: {
        status: 'closed',
    },
    reducers: {
        setOpenStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setOpenStatus } = switchSlice.actions;
export default switchSlice.reducer;
