import React from 'react';
import { Button } from 'react-native';
import { View, Text, Image, TouchableWithoutFeedback, Pressable } from 'react-native';
import Carousel from 'react-native-snap-carousel';
const Colors = require("../style/Colors.json");
const data = [
    {
        image: require("../../assets/Restaurant.png"),
        dishes: [
            require("../../assets/Dishe.png"),
            require("../../assets/Dishe.png"),
            require("../../assets/Dishe.png"),
        ],
        title: "Restaurant Name",
        description: "Restaurant description",
    },
    {
        image: require("../../assets/Restaurant.png"),
        dishes: [
            require("../../assets/Dishe.png"),
            require("../../assets/Dishe.png"),
            require("../../assets/Dishe.png"),
        ],
        title: "Restaurant Name",
        description: "Restaurant description",
    },
    {
        image: require("../../assets/Restaurant.png"),
        dishes: [
            require("../../assets/Dishe.png"),
            require("../../assets/Dishe.png"),
            require("../../assets/Dishe.png"),
        ],
        title: "Restaurant Name",
        description: "Restaurant description",
    },
    {
        image: require("../../assets/Restaurant.png"),
        dishes: [
            require("../../assets/Dishe.png"),
            require("../../assets/Dishe.png"),
            require("../../assets/Dishe.png"),
        ],
        title: "Restaurant Name",
        description: "Restaurant description",
    },
];

const RestaurantsCardCarousel = () => {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.carouselItem}>
                <View style={styles.Containers}>
                    <View style={styles.containerImageAndTitle}>
                        <Image source={item.image} style={styles.image} />
                        <View style={styles.containerTitleAndDescription}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                    </View>
                    <View style={styles.dishesAndVisitButton}>
                        <View style={styles.dishesContainer}>
                            {item.dishes.map((dish, index) => (
                                <Image key={index} source={dish} style={styles.dishImage} />
                            ))}
                        </View>
                        <View style={styles.visitButton}>
                            <Button
                                onPress={() => console.log("Visitar")}
                                title="Visitar"
                                color={Colors.colors.neutral02Color.neutral_02}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <Carousel
            data={data}
            renderItem={renderItem}
            sliderWidth={330} // Largura do slider
            itemWidth={296}  // Largura de cada item
            itemHeight={152}
            style={styles.carousel}
        />
    );
};

const styles = {
    carouselItem: {
        width: 296,
        height: 170,
        backgroundColor: Colors.colors.neutral02Color.neutral_10,
        borderRadius: 16,
        marginBottom:20
    },
    Containers: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,

    },
    image: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 72,
    },
    title: {
        flexShrink: 0,
        color: Colors.colors.neutral02Color.neutral_02,
        fontFamily: 'Roboto',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    description: {
        flexShrink: 0,
        color: Colors.colors.neutral02Color.neutral_04,
        fontFamily: 'Roboto',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    dishesAndVisitButton: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 8,
        gap: 8,
        alignItems: 'center',
    },
    dishesContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: -15,
    },
    containerImageAndTitle: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        flexDirection: 'row',
    },

    visitButton: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 24,
        backgroundColor: Colors.colors.neutral02Color.neutral_02,
        color: Colors.colors.neutral02Color.neutral_10,
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        borderRadius: 100,
    }
};

export default RestaurantsCardCarousel;
