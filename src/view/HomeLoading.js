import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
const yourDataArray = [
    { id: 1, name: 'Restaurant 1'},
    { id: 2, name: 'Restaurant 2'},
    { id: 3, name: 'Restaurant 3'},
    { id: 4, name: 'Restaurant 4'},
    { id: 5, name: 'Restaurant 5'},
    { id: 6, name: 'Restaurant 6'},
    { id: 7, name: 'Restaurant 7'},
    { id: 8, name: 'Restaurant 8'},
    { id: 9, name: 'Restaurant 9'},
    { id: 10, name: 'Restaurant 10'},

];
const HomeLoading = () => {

    return (
        <View style={styles.container}>
            <View style={styles.containerSearchBarLoading}>
                <View style={styles.SearchBarLoading}></View>
                <View style={styles.FilterSearchLoading}></View>
            </View>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', bottom: 60 }}>
                <FlatList
                    data={yourDataArray}
                    renderItem={({ item }) => (
                        <View style={styles.RestaurantsCardCarouselLoading}></View>
                    )}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        paddingTop: '20%',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
    },
    containerSearchBarLoading: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    SearchBarLoading: {
        width: 264,
        height: 58,
        flexShrink: 0,
        backgroundColor: 'gray',
        borderRadius: 40,
    },
    FilterSearchLoading: {
        width: 56,
        height: 56,
        flexShrink: 0,
        backgroundColor: 'gray',
        borderRadius: 40,
    },
    RestaurantsCardCarouselLoading: {
        width: 296,
        height: 152,
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        flexShrink: 0,
        backgroundColor: 'gray',
        marginRight: 16,
    }

});

export default HomeLoading;