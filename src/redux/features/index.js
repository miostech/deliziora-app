import { combineReducers } from 'redux';
import restaurantsReducer from './restaurants/restaurantsSlice';
import markersReducer from './markers/markersSlice';
import carouselReducer from './carousel/carouselSlice';
import switchSliceReducer from './switchSlice/switchSlice';
import typesOfSearchReducer from './typesOfSearchSlice/typesOfSearchSlice';

const rootReducer = combineReducers({
    restaurants: restaurantsReducer,
    markers: markersReducer,
    carousel: carouselReducer,
    switchSlice: switchSliceReducer,
    typesOfSearch: typesOfSearchReducer,
});

export default rootReducer;

