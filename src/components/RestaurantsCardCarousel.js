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
import { RestaurantService } from "deliziora-client-module/client-web";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Colors = require("../style/Colors.json");

const RestaurantsCardCarousel = ({ navigation, setRestaurants, location }) => {
  const { carouselRef, goToMarker } = useContext(CarouselMapContext);
  const [data, setData] = useState([]);
  const [favoritesSelected, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch the favorites array from AsyncStorage and update the state
    const fetchFavorites = async () => {
      try {
        const favoritesString = await AsyncStorage.getItem('@favorites');
        const favoritesArray = favoritesString ? JSON.parse(favoritesString) : [];
        setFavorites(favoritesArray);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []); 
  const handleFavoriteToggle = async (id) => {
    try {
      const favoritesString = await AsyncStorage.getItem('@favorites');
      const favorites = favoritesString ? JSON.parse(favoritesString) : [];
      const index = favorites.indexOf(id);
      if (index === -1) {
        favorites.push(id);
      } else {
        favorites.splice(index, 1);
      }
      await AsyncStorage.setItem('@favorites', JSON.stringify(favorites));
      setFavorites(favorites);
      console.log('Favorites updated:', favorites);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  useEffect(() => {
    RestaurantService.returnAllRestaurants()
      .then((data) => {
        setData(data.data);
        setRestaurants(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {}, []);

  const renderItem = ({ item, index }) => {
    const isFavorite = favoritesSelected.includes(item._id.$oid);
    return (
      <View style={styles.carouselItem}>
        <View style={styles.Containers}>
          <View style={styles.containerImageAndTitle}>
            <Image source={{ uri: item.img }} style={styles.image} />
            <View style={styles.containerTitleAndDescription}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>
                {item.description.slice(0, 60)} ...
              </Text>
            </View>
          </View>
          <View style={styles.dishesAndVisitButton}>
            <View style={styles.dishesContainer}>
              <Pressable
                onPress={() => {
                  handleFavoriteToggle(item._id.$oid);
                }}
              >
                {isFavorite ? (
                  <Image
                    key={index}
                    source={require("../../assets/FavoriteSelected1.png")}
                    style={styles.dishImage}
                  />
                ) : (
                  <Image
                    key={index}
                    source={require("../../assets/Favorite1.png")}
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
                    location: location,
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
    height: "100%",
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
  containerTitleAndDescription: {
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    width: "65%",
    backgroundColor: Colors.colors.neutral02Color.neutral_10,
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
