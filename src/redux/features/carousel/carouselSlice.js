// carouselSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    location: null,
    listType: true,
    userLocation: null,
    idRestaurant: null,
};

const carouselSlice = createSlice({
    name: 'carousel',
    initialState,
    reducers: {
        setLocation(state, action) {
            state.location = action.payload;
        },
        setListType(state, action) {
            state.listType = action.payload;
        },
        setUserLocation(state, action) {
            state.userLocation = action.payload;
        },
        setIdRestaurant(state, action) {
            state.idRestaurant = action.payload;
        },
    },
});

export const { setLocation, setListType, setUserLocation, setIdRestaurant } = carouselSlice.actions;

export default carouselSlice.reducer;
