import { createSlice } from '@reduxjs/toolkit';

export const currentRestaurantSelectedSlice = createSlice({
    name: 'currentRestaurantSelected',
    initialState: {},
    reducers: {
        addCurrentRestaurant: (state, action) => {
            console.warn("ADD CURRENT RESTAURANT", action.payload);
            state = action.payload;
            return state;
        },
    },
});

export const { addCurrentRestaurant } = currentRestaurantSelectedSlice.actions;

export default currentRestaurantSelectedSlice.reducer;
