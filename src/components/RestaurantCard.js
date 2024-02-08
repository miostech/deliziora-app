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
            const data = await AsyncStorage.getItem('favoriteRestaurants');
            if (data !== null) {
                console.log('Dados armazenados no AsyncStorage:', data);
                setStoredData(data);
            }
        } catch (error) {
            console.error('Erro ao recuperar dados do AsyncStorage:', error);
        }
    };
    fetchDataFromStorage()

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
                    <Svg style={styles.icon} width="22" height="22" viewBox="0 0 22 22" fill={isFavorite ? "#FF0000" : "none"}>
                        <Path d="M11.8197 2.82407L11.3771 3.33703C11.1778 3.56804 10.8199 3.56824 10.6203 3.33745L10.1757 2.82322C8.07663 0.395538 4.67336 0.395538 2.5743 2.82322C0.475232 5.25088 0.475232 9.18692 2.5743 11.6146L10.4697 20.7459C10.7626 21.0847 11.2375 21.0847 11.5304 20.7459L19.4318 11.6129C21.5262 9.17721 21.5298 5.25219 19.4304 2.82407C17.3275 0.391976 13.9226 0.391976 11.8197 2.82407Z" stroke="#201F23" strokeWidth="2" />
                    </Svg>
                </Pressable>
            </View>
            <Text style={styles.distance}>
                Distância {distance} km
            </Text>
        </View>
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
