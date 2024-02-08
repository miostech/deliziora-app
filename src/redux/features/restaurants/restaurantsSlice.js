// restaurantsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allRestaurants: [],
    favoriteRestaurants: [],
};

const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        setAllRestaurants(state, action) {
            state.allRestaurants = action.payload;
        },
        addToFavorites(state, action) {
            const { restaurantId } = action.payload;
            if (!state.favoriteRestaurants.includes(restaurantId)) {
                state.favoriteRestaurants.push(restaurantId);
            }
        },
        removeFromFavorites(state, action) {
            const { restaurantId } = action.payload;
            state.favoriteRestaurants = state.favoriteRestaurants.filter(
                id => id !== restaurantId
            );
        },
    },
});

export const { setAllRestaurants, addToFavorites, removeFromFavorites } = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
