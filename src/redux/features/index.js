import { combineReducers } from 'redux';
import restaurantsReducer from './restaurants/restaurantsSlice';
import markersReducer from './markers/markersSlice';
import carouselReducer from './carousel/carouselSlice';
import switchSliceReducer from './switchSlice/switchSlice';
import typesOfSearchReducer from './typesOfSearchSlice/typesOfSearchSlice';
import characteristicsSliceReducer from './characteristicsSlice/characteristicsSlice';
import locationSlice from './locationSlice/locationSlice';
import listTypeReducer from './listTypeSlice/listTypeSlice';
import profilePageReducer from './profilePageSlice/profilePageSlice';
import currentRestaurantSelected from './currentRestaurantSelected/currentRestaurantSelectedSlice';
import menuOfDayReducer from './menuOfDaySlice/menuOfDaySlice'
import distanceSlice from './distanceSlice/distanceSlice';
import restaurantsFavoritesSlice from './restaurantsFavorites/restaurantsFavoritesSlice'
import currentRestaurantMarkerSlice from './currentRestaurantMarker/CurrentRestaurantMarker';
import newFilterTypeFeature from './newFiltersType/newFiltersType';


const rootReducer = combineReducers({
    restaurants: restaurantsReducer,
    markers: markersReducer,
    carousel: carouselReducer,
    distance: distanceSlice,
    switchSlice: switchSliceReducer,
    menuOfDay: menuOfDayReducer,
    typesOfSearch: typesOfSearchReducer,
    restaurantsFavorites: restaurantsFavoritesSlice,
    characteristics: characteristicsSliceReducer,
    location: locationSlice,
    listType: listTypeReducer,
    profilePage: profilePageReducer,
    currentRestaurantSelected: currentRestaurantSelected,
    currentRestaurantMarker: currentRestaurantMarkerSlice,
    newFilterTypeFeature: newFilterTypeFeature
});

export default rootReducer;
