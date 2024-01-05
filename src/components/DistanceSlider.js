//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements';
// create a component
const MyComponent = ({distance, setDistance, updateFilteredSearch}) => {


    const handleRangeChange = (value) => {
        setDistance(value);
        updateFilteredSearch()
    };

    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <Slider
                    style={styles.slider}
                    minimumValue={1} // updated minimum value to 1 km
                    maximumValue={100}
                    step={1}
                    value={distance}
                    onValueChange={handleRangeChange}
                    thumbStyle={styles.thumb}
                />
            </View>
            <View style={styles.ViewText}><Text style={styles.text}>{`${distance} km - 100 km`}</Text></View></View>

    );
};

// define your styles
const styles = StyleSheet.create({
    root: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    slider: {
        width: '100%',
    },
    thumb: {
        width: 28,
        height: 28,
        backgroundColor: 'white',
        borderRadius: 14,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    ViewText: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'black',
        display: "flex",
        width: 150,
        height: 51,
        padding: 8,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        gap: 5,
        flexShrink: 0,

    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    }

});

//make this component available to the app
export default MyComponent;