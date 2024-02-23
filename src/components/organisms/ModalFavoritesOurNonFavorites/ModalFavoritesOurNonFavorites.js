import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { setAllRestaurants, toggleFavorite } from '../../../redux/features/restaurants/restaurantsSlice';
import { RestaurantService } from 'deliziora-client-module/client-web';
import SearchBar2 from '../../SearchBar2';
import FiltersModal from '../../FiltersModal';
import RestaurantCard from '../../RestaurantCard';
import listType from '../../../redux/features/listTypeSlice/listTypeSlice';

const ModalFavoritesOurNonFavorites = () => {
    const listType = useSelector((state) => state.listType);
    const allrestaurants = useSelector((state) => state.restaurants.allRestaurants);
    const favoriteRestaurants = useSelector((state) => state.restaurants.favoriteRestaurants);
    const dispatch = useDispatch();
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    useEffect(() => {
        RestaurantService.returnAllRestaurants()
            .then((res) => {
                dispatch(setAllRestaurants(res.data));
                console.log('pegou', res.data);
            })
            .catch((err) => {
                console.log('ERROR', err);
            });
    }, [dispatch]);

    useEffect(() => {
        setFilteredRestaurants(allrestaurants);
    }, [allrestaurants]);

    const handleToggleFavorite = (restaurantId) => {
        dispatch(toggleFavorite(restaurantId));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    width: '90%',
                    height: '10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    alignSelf: 'center',
                    top: 45,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                }}>
                <SearchBar2 />
                <FiltersModal />
            </View>
            <View style={styles.favoritesContainer}>
                <Text style={styles.title}>Lista de Restaurantes</Text>
                <ScrollView style={styles.scrollView}>
                    {filteredRestaurants.map((restaurant) => (
                        <View key={restaurant._id.$oid} style={{ width: '100%', height: 100 }}>
                            <RestaurantCard
                                id={restaurant._id.$oid}
                                name={restaurant.name}
                                description={restaurant.description}
                                distance={'5'}
                                type="minimalist"
                                toggleFavorite={toggleFavorite}
                                imageUri={restaurant.img}
                                enableMomentum
                            />

                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: listType == false ? 'flex' : 'flex',
        height: '90%',
        paddingTop: 80,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    favoritesContainer: {
        flex: 1,
        width: '90%',
        marginTop: 60,
        gap: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scrollView: {
        flex: 1,
        height: '100%',
        marginBottom: 20,
    },
    favoriteButton: {
        textAlign: 'center',
        color: 'blue',
        marginTop: 5,
    },
});

export default ModalFavoritesOurNonFavorites;
