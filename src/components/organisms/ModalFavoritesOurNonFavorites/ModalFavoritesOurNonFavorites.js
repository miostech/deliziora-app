import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import ArrowLeft from '../../SVGs/ArrowLeft/ArrowLeft';
import { Dimensions } from 'react-native';
import SearchBar2 from '../../SearchBar2';
import RestaurantCard from '../../RestaurantCard';

const { width, height } = Dimensions.get('window');

const ModalFavoritesOrNonFavorites = ({ isVisible, isFavorite, onClose, restaurantData }) => {
    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={false}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {isFavorite ? (
                        <View style={styles.modalFavoritesContent}>
                            <View style={styles.modalFavoritesHeader}>
                                <View style={styles.arrowLeftContainer}>
                                    <Pressable onPress={onClose}>
                                        <ArrowLeft />
                                    </Pressable>
                                </View>
                                <View style={styles.headerTitleContainer}>
                                    <Text style={styles.headerTitle}>Favoritos</Text>
                                </View>
                            </View>
                            <View styles={styles.modalFavoritesBody}>
                                <SearchBar2 />
                                <View style={{ flex: 1, gap: 10 }}>
                                    {restaurantData.map(restaurant => (
                                        <RestaurantCard
                                            type={"minimalist"}
                                            key={restaurant._id.$oid}
                                            id={restaurant._id.$oid}
                                            name={restaurant.name}
                                            distance={"5"}
                                            imageUri={restaurant.img}
                                            enableMomentum
                                        />
                                    ))}
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.modalFavoritesContent}>
                            <View style={styles.modalFavoritesHeader}>
                                <View style={styles.arrowLeftContainer}>
                                    <Pressable onPress={onClose}>
                                        <ArrowLeft />
                                    </Pressable>
                                </View>
                                <View style={styles.headerTitleContainer}>
                                    <Text style={styles.headerTitle}>Favoritos</Text>
                                </View>
                            </View>
                            <View styles={styles.modalFavoritesBody}>
                                <SearchBar2 />
                                <View style={{ flex: 1, gap: 10 }}>
                                    {restaurantData.map(restaurant => (
                                        <RestaurantCard
                                            type={"minimalist"}
                                            key={restaurant._id.$oid}
                                            id={restaurant._id.$oid}
                                            name={restaurant.name}
                                            distance={"5"}
                                            imageUri={restaurant.img}
                                            enableMomentum
                                        />
                                    ))}
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: "#f6f6f6",
    },
    modalContent: {
        borderRadius: 10,
        alignItems: 'flex-start',
        width: "100%",
        height: "100%",
    },
    closeButton: {
        marginTop: height * 0.01, // 1% of the screen height
        color: 'blue',
        textDecorationLine: 'underline',
    },
    modalFavoritesContent: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
    },
    modalFavoritesHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: width * 0.98, // 98% of the screen width
        paddingTop: height * 0.06, // 3% of the screen height
    },
    arrowLeftContainer: {
        width: "10%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        paddingLeft: "5%",
        paddingBottom: "5%",
    },
    headerTitleContainer: {
        width: "90%",
        height: "100%",
        alignItems: "center",
        paddingRight: "10%",
    },
    headerTitle: {
        color: "#313033",
        fontFamily: "Roboto",
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "500"
    },
    modalFavoritesBody: {
        display: "flex",
        width: width * 0.98, // 98% of the screen width
        height: height * 0.95, // 98% of the screen height
        paddingTop: height * 0.06,
    }
}

export default ModalFavoritesOrNonFavorites;
