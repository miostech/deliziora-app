import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/features/restaurants/restaurantsSlice';

export default function RestaurantCard({ id, name, description, distance, imageUri, isLoading }) {
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(false);
    const favoriteRestaurants = useSelector(state => state.restaurants.favoriteRestaurants);

    useEffect(() => {
        // Verifica se o restaurante está nos favoritos ao montar o componente
        checkIsFavorite();
    }, [favoriteRestaurants]);

    const checkIsFavorite = async () => {
        try {
            // Recupera os restaurantes favoritos do AsyncStorage
            const storedFavorites = await AsyncStorage.getItem('favoriteRestaurants');
            if (storedFavorites) {
                const parsedFavorites = JSON.parse(storedFavorites);
                setIsFavorite(parsedFavorites.includes(id));
            }
        } catch (error) {
            console.error('Erro ao recuperar restaurantes favoritos:', error);
        }
    };

    const toggleFavorite = async () => {
        try {
            // Verifica se o restaurante é favorito
            if (isFavorite) {
                // Remove o restaurante dos favoritos
                const updatedFavorites = favoriteRestaurants.filter(restaurantId => restaurantId !== id);
                await AsyncStorage.setItem('favoriteRestaurants', JSON.stringify(updatedFavorites));
                dispatch(removeFromFavorites({ restaurantId: id }));
            } else {
                // Adiciona o restaurante aos favoritos
                const updatedFavorites = [...favoriteRestaurants, id];
                await AsyncStorage.setItem('favoriteRestaurants', JSON.stringify(updatedFavorites));
                dispatch(addToFavorites({ restaurantId: id }));
            }
            // Atualiza o estado local do favorito
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Erro ao atualizar restaurantes favoritos:', error);
        }
    };

    if (isLoading) {
        // Se estiver carregando, exibir o esqueleto
        return (
            <View style={[styles.restaurantCard, styles.skeleton]}>
                <ActivityIndicator size="large" color="#CCCCCC" />
            </View>
        );
    }

    const fetchDataFromStorage = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favoriteRestaurants');
            if (storedFavorites !== null) {
                const parsedFavorites = JSON.parse(storedFavorites);
                console.log('IDs dos restaurantes favoritos:', parsedFavorites);
            } else {
                console.log('Nenhum restaurante favorito encontrado.');
            }
        } catch (error) {
            console.error('Erro ao recuperar dados do AsyncStorage:', error);
        }
    };

    fetchDataFromStorage();


    return (
        <View style={styles.restaurantCard}>
            <View style={styles.cardBackground} />
            <View style={styles.restaurantImage}>
                <ImageBackground style={styles.image} source={{ uri: imageUri }} />
            </View>
            <Text style={styles.restaurantName}>
                {name}
            </Text>
            <Text style={styles.description}>
                {description}
            </Text>
            <View style={styles.favoriteIcon}>
                <Pressable onPress={toggleFavorite}>
                    {isFavorite ? (
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="#F36527" stroke="#F36527" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M12.8197 3.82407L12.3771 4.33703C12.1778 4.56804 11.8199 4.56824 11.6203 4.33745L11.1757 3.82322C9.07663 1.39554 5.67336 1.39554 3.5743 3.82322C1.47523 6.25088 1.47523 10.1869 3.5743 12.6146L11.4697 21.7459C11.7626 22.0847 12.2375 22.0847 12.5304 21.7459L20.4318 12.6129C22.5262 10.1772 22.5298 6.25219 20.4304 3.82407C18.3275 1.39198 14.9226 1.39198 12.8197 3.82407Z" stroke="#F36527" stroke-width="2" />
                        </Svg>) : (
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M12.8197 3.82407L12.3771 4.33703C12.1778 4.56804 11.8199 4.56824 11.6203 4.33745L11.1757 3.82322C9.07663 1.39554 5.67336 1.39554 3.5743 3.82322C1.47523 6.25088 1.47523 10.1869 3.5743 12.6146L11.4697 21.7459C11.7626 22.0847 12.2375 22.0847 12.5304 21.7459L20.4318 12.6129C22.5262 10.1772 22.5298 6.25219 20.4304 3.82407C18.3275 1.39198 14.9226 1.39198 12.8197 3.82407Z" stroke="#201F23" stroke-width="2" />
                        </Svg>
                    )
                    }
                </Pressable>
            </View>
            <Text style={styles.distance}>
                Distância {distance} km
            </Text>
        </View >
    );
}

const styles = StyleSheet.create({
    restaurantCard: {
        height: 200,
        width: "100%",
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 9,
        shadowColor: '#000000',
        shadowOpacity: 0.05,
    },
    cardBackground: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    restaurantImage: {
        position: 'absolute',
        top: 12,
        left: 12,
        width: 100,
        height: 100,
    },
    image: {
        flex: 1,
        borderRadius: 6,
    },
    restaurantName: {
        position: 'absolute',
        top: 12,
        left: 124,
        fontSize: 16,
        fontWeight: '500',
        color: '#29272D',
        fontFamily: 'JUST Sans',
    },
    description: {
        position: 'absolute',
        top: 120,
        left: 13,
        width: 164,
        fontSize: 12,
        fontWeight: '400',
        color: '#48464A',
        fontFamily: 'Roboto',
    },
    favoriteIcon: {
        position: 'absolute',
        top: 12,
        right: 12,
    },
    icon: {
        width: 22,
        height: 22,
    },
    distance: {
        position: 'absolute',
        bottom: 12,
        left: 12,
        fontSize: 11,
        fontWeight: '400',
        color: '#79767B',
        fontFamily: 'Roboto',
    },
    skeleton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
