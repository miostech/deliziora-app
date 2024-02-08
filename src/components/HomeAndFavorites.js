import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import SearchBar from './SearchBar'

const colors = require("../style/Colors.json");
import CarouselMapContext from "../components/CarouselMapContext";
import { FlatList } from 'react-native-gesture-handler';
export default function HomeAndFavorites() {
    const [isLoading, setIsLoading] = useState(true);
    const [filteredSearch, setFilteredSearch] = useState({});
    const [search, setSearch] = useState('');
    const [restaurants, setRestaurants] = useState([]);

    const [allRestaurant, setAllRestaurants] = useState([])
    useContext(CarouselMapContext);
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <SearchBar filteredSearch={filteredSearch} setFilteredSearch={setFilteredSearch} setSearch={setSearch} setListRestaurant={setRestaurants} listRestaurant={allRestaurant} filteredRestaurants={restaurants} search={search} />
            </View>
            <View style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "stretch",
                marginTop: 24
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: 'JUST Sans',
                    fontSize: 16,
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: undefined, // 'normal' line-height in React Native is achieved by setting it to undefined
                }}
                >
                    Restaurantes favoritos
                </Text>
                <Pressable onPress={console.warn("hello")}>
                    <Text style={styles.seeMoreFavorites}>Ver mais</Text>
                </Pressable>
                <View style={styles.favoritesListContainer}>
                   {/*  <FlatList
                        data={restaurants.filter(restaurant => restaurant.isFavorite)}
                        renderItem={({ item }) => (
                            <View style={styles.restaurantItem}>
                                <Text style={styles.restaurantTitle}>{item.name}</Text>
                            </View>
                        )}
                        horizontal
                        
                    /> */}
                </View>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    seeMoreFavorites: {
        color: colors.colors.baseColor.base_01,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: undefined, // 'normal' line-height in React Native is achieved by setting it to undefined
    },
})
