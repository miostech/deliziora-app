import { combineReducers } from 'redux';
import restaurantsReducer from './restaurants/restaurantsSlice';
import markersReducer from './markers/markersSlice';
import carouselReducer from './carousel/carouselSlice';
import switchSliceReducer from './switchSlice/switchSlice';
import typesOfSearchReducer from './typesOfSearchSlice/typesOfSearchSlice';
import characteristicsSliceReducer from './characteristicsSlice/characteristicsSlice';
const rootReducer = combineReducers({
    restaurants: restaurantsReducer,
    markers: markersReducer,
    carousel: carouselReducer,
    switchSlice: switchSliceReducer,
    typesOfSearch: typesOfSearchReducer,
    characteristics: characteristicsSliceReducer,
});

export default rootReducer;

