//import liraries
import React from 'react';
import { View , StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';

// create a component
const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <SearchBar />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default HomeScreen;
