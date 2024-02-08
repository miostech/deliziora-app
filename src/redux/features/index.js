// features/index.js

import { combineReducers } from 'redux';
import restaurantsReducer from './restaurants/restaurantsSlice';

const rootReducer = combineReducers({
    restaurants: restaurantsReducer,
    // Here i will add more Reducers
});

export default rootReducer;
