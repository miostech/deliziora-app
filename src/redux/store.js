import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from './reducers/restaurantSlice';

export const store = configureStore({
    reducer: {
        restaurants: restaurantReducer
    },
});
