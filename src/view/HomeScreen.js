//import liraries
import React from 'react';
import { View , StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import RestaurantsCardCarousel from '../components/RestaurantsCardCarousel';
import a from '@ant-design/react-native/lib/modal/alert';

// create a component
const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <SearchBar />
            <RestaurantsCardCarousel/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 75,
        display: 'flex',
        gap: 500,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

//make this component available to the app
export default HomeScreen;
