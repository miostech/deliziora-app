import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { setAllRestaurants } from '../redux/features/restaurants/restaurantsSlice';
import { RestaurantService } from 'deliziora-client-module/client-web';
import { SafeAreaView } from 'react-native-safe-area-context';
import RestaurantCard from './RestaurantCard';
import Carousel from 'react-native-snap-carousel';

import { Dimensions } from 'react-native';
import SearchBar2 from './SearchBar2';
const colors = require('./../style/Colors.json');
const windowWidth = Dimensions.get('window').width;

const HomeAndFavorites = () => {
    const allrestaurants = useSelector(state => state.restaurants.allRestaurants);
    const favoriteRestaurants = useSelector(state => state.restaurants.favoriteRestaurants);
    const dispatch = useDispatch();
    const [justRestaurantsFavorite, setJustRestaurantsFavorite] = useState([]);
    const [nonFavoriteRestaurants, setNonFavoriteRestaurants] = useState([]);
    useEffect(() => {
        RestaurantService.returnAllRestaurants()
            .then(res => {
                dispatch(setAllRestaurants(res.data));
                console.log("pegou", res.data);
            })
            .catch(err => {
                console.log("ERROR", err);
            });
    }, [dispatch]);

    useEffect(() => {
        console.log("Redux State - All Restaurants:", allrestaurants);
    }, [allrestaurants]);
    useEffect(() => {
        console.log("Redux State - Favorite Restaurants:", favoriteRestaurants);
        // Mapeia os IDs dos favoritos para obter os detalhes completos dos restaurantes
        const favoriteRestaurantsDetails = allrestaurants.filter(restaurant => favoriteRestaurants.includes(restaurant._id.$oid));
        setJustRestaurantsFavorite(favoriteRestaurantsDetails);

        // Filtra os restaurantes que não estão na lista de favoritos
        const nonFavoriteRestaurantsDetails = allrestaurants.filter(restaurant => !favoriteRestaurants.includes(restaurant._id.$oid));
        setNonFavoriteRestaurants(nonFavoriteRestaurantsDetails);
    }, [favoriteRestaurants, allrestaurants]);

    const renderRestaurantCard = ({ item }) => (
        <RestaurantCard
            key={item._id.$oid}
            id={item._id.$oid} // Passa o ID do restaurante para o RestaurantCard
            name={item.name}
            description={item.description}
            distance={"5km"} // Use a função apropriada para calcular a distância
            imageUri={item.img}
            enableMomentum
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <SearchBar2 />
            <View style={styles.favoritesContainer}>
                <View style={{ width: "100%", justifyContent: 'flex-start'}}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.title}>Restaurantes favoritos</Text>
                        <Pressable onPress={() => console.warn("hello")}>
                            <Text style={styles.seeMore}>Ver mais</Text>
                        </Pressable>
                    </View>
                    {/* Aqui vai ser os Favoritos */}
                    <View style={styles.cardList}>
                        <Carousel
                            data={justRestaurantsFavorite} // Alterado para renderizar apenas os restaurantes favoritos
                            sliderWidth={windowWidth} // Largura do slider baseada na largura da tela do dispositivo
                            itemWidth={windowWidth * 0.75} // Largura de cada item com 5% a menos
                            itemHeight={190} // Altura de cada item com 5% a menos
                            renderItem={renderRestaurantCard}
                            keyExtractor={item => item._id.$oid}
                            style={styles.cardListStyle}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.nonFavoritesContainer}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.title}>Demais restaurantes</Text>
                    <Pressable onPress={() => console.warn("hello")}>
                        <Text style={styles.seeMoreFavorites}>Ver mais</Text>
                    </Pressable>
                </View>
                {/* Aqui serão os que não são favoritos */}
                <Carousel
                    data={nonFavoriteRestaurants} // Renderiza apenas os restaurantes que não estão na lista de favoritos
                    sliderWidth={windowWidth} // Largura do slider baseada na largura da tela do dispositivo
                    itemWidth={windowWidth * 0.75} // Largura de cada item com 5% a menos
                    itemHeight={190} // Altura de cada item com 5% a menos
                    renderItem={renderRestaurantCard}
                    keyExtractor={item => item._id.$oid}
                    style={styles.cardListStyle}
                />
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    favoritesContainer: {
        width: '100%',
        height: "35%",
        marginTop: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: "2%",
    },
    cardList: {
        width: "100%",
        position: "relative",
    },
    cardListStyle: {
        position: "absolute",
        left: 0
    },
    sectionHeader: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: 'space-between'
    },
    title: {
        textAlign: 'right',
        padding: "2%",
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    seeMore: {
        color: colors.colors.baseColor.base_01,
        textAlign: 'right',
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        padding: "2%",
    },
    restaurantListContainer: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 12,
    },
    favoritesContainer: {
        width: '100%',
        height: "35%",
        marginTop: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "2%",
    },
    nonFavoritesContainer: {
        width: '98%',
        height: "35%",
        marginTop: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "2%",
    },
    title: {
        textAlign: 'right',
        padding: "2%",
        marginLeft: 10,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    seeMoreFavorites: {
        color: colors.colors.baseColor.base_01,
        textAlign: 'right',
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        padding: "2%",
    },
    favoritesListContainer: {
        width: "100%",
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 12,
    },
    restaurantItem: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    restaurantTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeAndFavorites;
