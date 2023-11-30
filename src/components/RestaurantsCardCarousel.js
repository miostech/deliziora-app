import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Dimensions } from "react-native";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import CarouselMapContext from "./CarouselMapContext";
import * as Device from "expo-device";

const Colors = require("../style/Colors.json");
const dataRestaurant = [
  {
    id: 1,
    image: require("../../assets/Restaurant1.png"),
    dishes: require("../../assets/Favorite1.png"),
    isFavorite: false,
    title: "Restaurant Name 1",
    description: "Restaurant description",
    address: "Jl, Raya Yeh gangga - n°65",
    contact: "911111111",
    coordinates: { latitude: 38.524319, longitude: -8.889212 },

    about:
      "Lorem ipsum dolor sit amet consectetur. Unc ullamcorper donec felis tincidunt sit.  Amet pulvinar aliquet donec non vitae accumsan amet fringilla. Venenatis proin elementum enim sed ut eu sit. Id vel dictu.",
  },
  {
    id: 2,
    image: require("../../assets/Restaurant1.png"),
    dishes: require("../../assets/Favorite1.png"),
    isFavorite: false,
    title: "Restaurant Name 2",
    description: "Restaurant description",
    address: "Jl, Raya Yeh gangga - n°63",
    contact: "911111444",
    coordinates: { latitude: 38.526971, longitude: -8.889441 },

    about:
      "Lorem ipsum dolor sit amet consectetur. Unc ullamcorper donec felis tincidunt sit.  Amet pulvinar aliquet donec non vitae accumsan amet fringilla. Venenatis proin elementum enim sed ut eu sit. Id vel dictu.",
  },
  {
    id: 3,
    image: require("../../assets/Restaurant1.png"),
    dishes: require("../../assets/Favorite1.png"),
    isFavorite: false,
    title: "Restaurant Name 3",
    description: "Restaurant description",
    address: "Jl, Raya Yeh gangga - n°61",
    contact: "911111112",
    coordinates: { latitude: 38.52981, longitude: -8.895425 },

    about:
      "Lorem ipsum dolor sit amet consectetur. Unc ullamcorper donec felis tincidunt sit.  Amet pulvinar aliquet donec non vitae accumsan amet fringilla. Venenatis proin elementum enim sed ut eu sit. Id vel dictu.",
  },
  {
    id: 4,
    image: require("../../assets/Restaurant1.png"),
    dishes: require("../../assets/Favorite1.png"),
    isFavorite: false,
    title: "Restaurant Name 4",
    description: "Restaurant description",
    address: "Jl, Raya Yeh gangga - n°66",
    contact: "911111333",
    coordinates: { latitude: 38.528576, longitude: -8.900009 },
    about:
      "Lorem ipsum dolor sit amet consectetur. Unc ullamcorper donec felis tincidunt sit.  Amet pulvinar aliquet donec non vitae accumsan amet fringilla. Venenatis proin elementum enim sed ut eu sit. Id vel dictu.",
  },
  {
    id: 5,
    image: require("../../assets/Restaurant1.png"),
    dishes: require("../../assets/Favorite1.png"),
    isFavorite: false,
    title: "Restaurant Name 5",
    description: "Restaurant description",
    address: "Jl, Raya Yeh gangga - n°66",
    contact: "911111333",
    coordinates: {
      latitude: 38.539908,
      longitude: -8.869396,
    },
    about:
      "Lorem ipsum dolor sit amet consectetur. Unc ullamcorper donec felis tincidunt sit.  Amet pulvinar aliquet donec non vitae accumsan amet fringilla. Venenatis proin elementum enim sed ut eu sit. Id vel dictu.",
  },
];

const RestaurantsCardCarousel = ({ navigation, setRestaurants, location }) => {
  const { carouselRef, goToMarker } = useContext(CarouselMapContext);
  const [data, setData] = useState(dataRestaurant);
  const handleFavoriteToggle = (id) => {
    const updatedRestaurants = data.map((restaurant) =>
      restaurant.id === id
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    );
    setData(updatedRestaurants);
  };
  useEffect(() => {
    setRestaurants(data);
  }, []);

  const renderItem = ({ item, index }) => {
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
              <Pressable
                onPress={() => {
                  handleFavoriteToggle(item.id);
                }}
              >
                {item.isFavorite ? (
                  <Image
                    key={index}
                    source={require("../../assets/FavoriteSelected1.png")}
                    style={styles.dishImage}
                  />
                ) : (
                  <Image
                    key={index}
                    source={item.dishes}
                    style={styles.dishImage}
                  />
                )}
              </Pressable>
            </View>
            <View style={styles.visitButton}>
              <Button
                onPress={() =>
                  navigation.navigate("ProfileRestaurantPage", {
                    restaurant: item,
                    location: location
                  })
                }
                title="Abrir"
                color={
                  Device.brand == "Apple"
                    ? Colors.colors.neutral01Color.neutral_08
                    : Colors.colors.neutral02Color.neutral_02
                }
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Carousel
      ref={carouselRef}
      data={data}
      renderItem={renderItem}
      sliderWidth={350} // Largura do slider
      itemWidth={290} // Largura de cada item
      itemHeight={152}
      style={styles.carousel}
      enableMomentum
      onSnapToItem={(e) => {
        goToMarker(e, data);
      }}
    />
  );
};

const styles = {
  carouselItem: {
    width: 290,
    height: 170,

    backgroundColor: Colors.colors.neutral02Color.neutral_10,
    borderRadius: 16,
    marginBottom: 20,
  },
  Containers: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
  },
  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 72,
  },
  dishImage: {
    width: 30,
    height: 30,
  },
  title: {
    flexShrink: 0,
    color: Colors.colors.neutral02Color.neutral_02,
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "400",
  },
  description: {
    flexShrink: 0,
    color: Colors.colors.neutral02Color.neutral_04,
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
  },
  dishesAndVisitButton: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 8,
    alignItems: "center",
  },
  dishesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: -15,
  },
  containerImageAndTitle: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    flexDirection: "row",
  },

  visitButton: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 24,
    backgroundColor: Colors.colors.neutral02Color.neutral_02,
    color: Colors.colors.neutral02Color.neutral_10,
    textAlign: "center",
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    borderRadius: 100,
  },
};

export default RestaurantsCardCarousel;
