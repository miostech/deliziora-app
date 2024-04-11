import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allRestaurants: [],
    favoriteRestaurants: [],
    allRestaurantsOpen: [],
    filteredRestaurants: [],
    restaurantsFilteredForModal: [],
    searchTerm: '', // novo estado para guardar o termo de busca
    filtersIsActive: false, // novo estado que indica se os filtros estão ativos (começa em false)
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
        },
        setRestaurantsFilteredForModal(state, action) {
            state.restaurantsFilteredForModal = action.payload;
        },
        setSearchTerm(state, action) { // action para atualizar o termo de busca
            state.searchTerm = action.payload;
        },
        setFiltersIsActive(state, action) { // action para atualizar o estado de filtros ativos
            state.filtersIsActive = action.payload;
        },
    },
});

export const { 
    setAllRestaurants, 
    addToFavorites, 
    removeFromFavorites, 
    setAllFavoritesRestaurants, 
    setAllRestaurantsOpen, 
    setFilteredRestaurants, 
    setRestaurantsFilteredForModal,
    setSearchTerm, // adicionando a nova action à exportação
    setFiltersIsActive // adicionando a nova action à exportação
} = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
