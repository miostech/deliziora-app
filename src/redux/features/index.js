import { combineReducers } from 'redux';
import restaurantsReducer from './restaurants/restaurantsSlice';
import markersReducer from './markers/markersSlice';
import carouselReducer from './carousel/carouselSlice';
import switchSliceReducer from './switchSlice/switchSlice';
import typesOfSearchReducer from './typesOfSearchSlice/typesOfSearchSlice';
import characteristicsSliceReducer from './characteristicsSlice/characteristicsSlice';
import locationReducer from './locationSlice/locationSlice';
import listTypeReducer from './listTypeSlice/listTypeSlice';
import profilePageReducer from './profilePageSlice/profilePageSlice';
import currentRestaurantSelected from './currentRestaurantSelected/currentRestaurantSelectedSlice';
import menuOfDayReducer from './menuOfDaySlice/menuOfDaySlice'
import distanceSlice from './distanceSlice/distanceSlice';

const rootReducer = combineReducers({
    restaurants: restaurantsReducer,
    markers: markersReducer,
    carousel: carouselReducer,
    distance: distanceSlice,
    switchSlice: switchSliceReducer,
    menuOfDay: menuOfDayReducer,
    typesOfSearch: typesOfSearchReducer,
    characteristics: characteristicsSliceReducer,
    location: locationReducer,
    listType: listTypeReducer,
    profilePage: profilePageReducer,
    currentRestaurantSelected: currentRestaurantSelected,
});

export default rootReducer;
