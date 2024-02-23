import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, StyleSheet, ActivityIndicator, Pressable, Button } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/features/restaurants/restaurantsSlice';
import { useNavigation } from '@react-navigation/native'; // Importação necessária para usar a navegação

import * as Device from "expo-device";
import { setCurrentId } from '../redux/features/profilePageSlice/profilePageSlice';
const colors = require('./../style/Colors.json')

// Componente para o card completo
function CompleteRestaurantCard({ id, name, description, navigation, distance, imageUri, isFavorite, toggleFavorite, onOpen }) {
    return (
        <View style={styles.restaurantCard}>
            <View style={styles.rowCardOne}>
                {/* <ImageBackground style={styles.image} source={{ uri: imageUri }} /> */}
                <View>
                    <Text style={styles.restaurantName}>
                        {name}
                    </Text>
                    <Text style={styles.distance}>
                        Distância {distance} km
                    </Text>
                </View>
                <Pressable onPress={toggleFavorite}>
                    {isFavorite ? (
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="#F36527" stroke="#F36527" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M12.8197 3.82407L12.3771 4.33703C12.1778 4.56804 11.8199 4.56824 11.6203 4.33745L11.1757 3.82322C9.07663 1.39554 5.67336 1.39554 3.5743 3.82322C1.47523 6.25088 1.47523 10.1869 3.5743 12.6146L11.4697 21.7459C11.7626 22.0847 12.2375 22.0847 12.5304 21.7459L20.4318 12.6129C22.5262 10.1772 22.5298 6.25219 20.4304 3.82407C18.3275 1.39198 14.9226 1.39198 12.8197 3.82407Z" stroke="#F36527" strokeWidth="2" />
                        </Svg>) : (
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M12.8197 3.82407L12.3771 4.33703C12.1778 4.56804 11.8199 4.56824 11.6203 4.33745L11.1757 3.82322C9.07663 1.39554 5.67336 1.39554 3.5743 3.82322C1.47523 6.25088 1.47523 10.1869 3.5743 12.6146L11.4697 21.7459C11.7626 22.0847 12.2375 22.0847 12.5304 21.7459L20.4318 12.6129C22.5262 10.1772 22.5298 6.25219 20.4304 3.82407C18.3275 1.39198 14.9226 1.39198 12.8197 3.82407Z" stroke="#201F23" strokeWidth="2" />
                        </Svg>
                    )
                    }
                </Pressable>
            </View>
            <View style={styles.rowCardTwo}>
                <Text style={styles.description}>
                    {description.length > 100 ? `${description.slice(0, 100)}...` : description}
                </Text>
                <View style={styles.visitButton}>
                    <Button
                        onPress={() => onOpen(id)} // Aqui foi alterado para chamar onOpen com o ID do restaurante
                        title="Abrir"
                        color={
                            Device.brand == "Apple"
                                ? colors.colors.neutral01Color.neutral_08
                                : colors.colors.neutral02Color.neutral_02
                        }
                    />

                </View>
            </View>
        </View>
    );
}

// Componente para o card minimalista
function MinimalistRestaurantCard({ id, name, imageUri, isFavorite, toggleFavorite, distance }) {
    return (
        <View style={{
            height: 82,
            maxHeight: 82,
            width: "90%",
            maxWidth: "90%",
            justifySelf: "center",
            alignSelf: "center",
            marginTop: 15,
            marginBottom: -7,
            display: "flex",
            flexDirection: 'column',
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
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                height: '100%',
                width: "100%",
                padding: "2%",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 10
            }}>
                {/* <ImageBackground style={
                    {
                        width: 72,
                        height: 58,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 8
                    }
                } source={{ uri: imageUri }} /> */}
                <View>
                    <Text style={{
                        maxWidth: 200,
                        fontSize: 16,
                        fontWeight: '500',
                        color: '#29272D',
                    }}>
                        {name}
                    </Text>
                    <Text style={{
                        fontSize: 11,
                        fontWeight: '400',
                        color: '#79767B',
                        fontFamily: 'Roboto',
                    }}>
                        Distance: {distance} km
                    </Text>
                </View>
                <Pressable onPress={toggleFavorite} style={{
                    alignSelf: "flex-end",
                    justifySelf: "flex-end",
                    position: "absolute",
                    top: 10,
                    right: 10,
                }}>
                    {isFavorite ? (
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="#F36527" stroke="#F36527" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M12.8197 3.82407L12.3771 4.33703C12.1778 4.56804 11.8199 4.56824 11.6203 4.33745L11.1757 3.82322C9.07663 1.39554 5.67336 1.39554 3.5743 3.82322C1.47523 6.25088 1.47523 10.1869 3.5743 12.6146L11.4697 21.7459C11.7626 22.0847 12.2375 22.0847 12.5304 21.7459L20.4318 12.6129C22.5262 10.1772 22.5298 6.25219 20.4304 3.82407C18.3275 1.39198 14.9226 1.39198 12.8197 3.82407Z" stroke="#F36527" strokeWidth="2" />
                        </Svg>) : (
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M12.8197 3.82407L12.3771 4.33703C12.1778 4.56804 11.8199 4.56824 11.6203 4.33745L11.1757 3.82322C9.07663 1.39554 5.67336 1.39554 3.5743 3.82322C1.47523 6.25088 1.47523 10.1869 3.5743 12.6146L11.4697 21.7459C11.7626 22.0847 12.2375 22.0847 12.5304 21.7459L20.4318 12.6129C22.5262 10.1772 22.5298 6.25219 20.4304 3.82407C18.3275 1.39198 14.9226 1.39198 12.8197 3.82407Z" stroke="#201F23" strokeWidth="2" />
                        </Svg>
                    )
                    }
                </Pressable>
            </View>
        </View>
    );
}

export default function RestaurantCard({ id, name, description, distance, imageUri, isLoading, type, onOpen }) {
    const navigation = useNavigation(); // Obter objeto de navegação

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
            console.log("HERE", id)
            // Verifica se o restaurante é favorito
            if (favoriteRestaurants.includes(id)) {
                // Remove o restaurante dos favoritos
                dispatch(removeFromFavorites({ restaurantId: id }));
            } else {
                // Adiciona o restaurante aos favoritos
                dispatch(addToFavorites({ restaurantId: id }));
            }
        } catch (error) {
            console.error('Erro ao atualizar restaurantes favoritos:', error);
        }
    };

    const handleOpen = () => {
        // Navegar para a página ProfileRestaurantPage com o ID do card clicado
        navigation.navigate('ProfileRestaurantPage', { restaurantId: id });
        // Armazenar o ID do restaurante no estado global do Redux
        dispatch(setCurrentId(id));
        console.log(id, "cade");
    };


    if (isLoading) {
        // Se estiver carregando, exibir o esqueleto
        return (
            <View style={[styles.restaurantCard, styles.skeleton]}>
                <ActivityIndicator size="large" color="#CCCCCC" />
            </View>
        );
    }

    if (type === 'complete') {
        return (
            <CompleteRestaurantCard
                id={id}
                name={name}
                description={description}
                distance={distance}
                imageUri={imageUri}
                isFavorite={favoriteRestaurants.includes(id)}
                toggleFavorite={toggleFavorite}
                onOpen={handleOpen} // Alterado para chamar handleOpen
            />
        );
    } else if (type === 'minimalist') {
        return (
            <MinimalistRestaurantCard
                id={id}
                name={name}
                distance={distance}
                imageUri={imageUri}
                isFavorite={favoriteRestaurants.includes(id)}
                toggleFavorite={toggleFavorite}
            />
        );
    }
}

const styles = StyleSheet.create({
    restaurantCard: {
        height: 200,
        maxHeight: 200,
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: 'column',
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

    rowCardOne: {
        display: 'flex',
        flexDirection: 'row',
        height: '50%',
        width: "100%",
        padding: "2%",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    rowCardTwo: {
        display: 'flex',
        flexDirection: 'row',
        height: '50%',
        width: "100%",
        padding: "2%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    image: {
        flex: 1,
        minHeight: 100,
        maxHeight: 100,
        minWidth: 100,
        maxWidth: 100
    },
    description: {
        width: "60%",
        textAlign: "justify",
        fontSize: 12,
        fontWeight: '400',
        color: '#48464A',
        fontFamily: 'Roboto',
    },
    distance: {
        fontSize: 11,
        fontWeight: '400',
        color: '#79767B',
        fontFamily: 'Roboto',
    },
    visitButton: {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 5,
        paddingHorizontal: 24,
        backgroundColor: colors.colors.neutral02Color.neutral_02,
        color: colors.colors.neutral02Color.neutral_10,
        textAlign: "center",
        fontFamily: "Roboto",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
        borderRadius: 100,
    },
    skeleton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
