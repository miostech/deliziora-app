// restaurantsSlice.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allRestaurants: [

    ],
    favoriteRestaurants: [],
    allRestaurantsOpen: [],
    filteredRestaurants: [],
};

const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        setAllRestaurants(state, action) {
            state.allRestaurants = action.payload;
        },
        setFilteredRestaurants(state, action) {
            state.filteredRestaurants = action.payload;
            console.log(state.filteredRestaurants, "Oi");
        },
        setAllRestaurantsOpen(state, action) {
            state.allRestaurantsOpen = action.payload;
        },
        addToFavorites(state, action) {
            const { restaurantId } = action.payload;
            if (!state.favoriteRestaurants.includes(restaurantId)) {
                state.favoriteRestaurants.push(restaurantId);
            }
            AsyncStorage.setItem('@favoriteRestaurants', JSON.stringify(state.favoriteRestaurants));
        },
        removeFromFavorites(state, action) {
            const { restaurantId } = action.payload;
            state.favoriteRestaurants = state.favoriteRestaurants.filter(
                id => id !== restaurantId
            );
            AsyncStorage.setItem('@favoriteRestaurants', JSON.stringify(state.favoriteRestaurants));
        },
        setAllFavoritesRestaurants(state, action) {
            state.favoriteRestaurants = action.payload;
            AsyncStorage.setItem('@favoriteRestaurants', JSON.stringify(state.favoriteRestaurants));
        }
    },
});

export const { setAllRestaurants, addToFavorites, removeFromFavorites, setAllFavoritesRestaurants, setAllRestaurantsOpen, setFilteredRestaurants } = restaurantsSlice.actions;


export default restaurantsSlice.reducer;
