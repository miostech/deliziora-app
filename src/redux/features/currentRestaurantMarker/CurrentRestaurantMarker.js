import { createSlice } from '@reduxjs/toolkit';

export const currentRestaurantMarkerSlice = createSlice({
    name: 'currentRestaurantMarker',
    initialState: "",
    reducers: {
        setCurrentRestaurantMarker: (state, action) => {
            state = action.payload;
            return state;
        },
    },
});

export const { setCurrentRestaurantMarker } = currentRestaurantMarkerSlice.actions;

export default currentRestaurantMarkerSlice.reducer;
