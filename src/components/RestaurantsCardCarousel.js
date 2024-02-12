import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Dimensions } from "react-native";
import {
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import CarouselMapContext from "./CarouselMapContext";
import * as Device from "expo-device";
import { RestaurantService } from "deliziora-client-module/client-web";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Loader from "./Loader";
import { set } from "date-fns";

const Colors = require("../style/Colors.json");

const RestaurantsCardCarousel = ({
  navigation,
  setRestaurants,
  location,
  filteredSearch,
  search,
  listRestaurants
}) => {
  const { carouselRef, goToMarker } = useContext(CarouselMapContext);
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let isMounted = true; // Flag to track component mount state

    const fetchFavorites = async () => {
      try {
        // Simulate a loading state while fetching
        setIsLoading(true);

        const favoritesString = await AsyncStorage.getItem("@favorites");
        const favoritesArray = favoritesString
          ? JSON.parse(favoritesString)
          : [];

        // Only update the state if the component is still mounted
        if (isMounted) {
          setFavoriteIds((prevFavoritesArray) => [
            ...prevFavoritesArray,
            ...favoritesArray,
          ]);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
        // Handle error state or log it if necessary
      } finally {
        // Ensure loading state is set to false regardless of success or error
        setIsLoading(false);
      }
    };

    fetchFavorites();
    console.log(favoriteIds);
    // Cleanup function to set the isMounted flag to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []);

  const handleFavoriteToggle = async (id) => {
    try {
      const favorites = new Set(favoriteIds);
      if (favorites.has(id)) {
        favorites.delete(id);
      } else {
        favorites.add(id);
      }

      await AsyncStorage.setItem("@favorites", JSON.stringify([...favorites]));
      setFavoriteIds((prevFavorites) => {
        const updatedFavorites = new Set(prevFavorites);
        if (updatedFavorites.has(id)) {
          updatedFavorites.delete(id);
        } else {
          updatedFavorites.add(id);
        }
        return [...updatedFavorites];
      });
      console.log("Favorites updated:", [...favorites]);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await RestaurantService.returnAllRestaurants();

        // setRestaurants(response.data);
        // const allData = listRestaurants

        // Check if filteredSearch has any criteria
        // if (search.length === 0) {
        //   setRestaurants(listRestaurants);
        //   return;
        // }
        // const filtered = listRestaurants.filter((item) =>
        //   item.name.toLowerCase().includes(search.toLowerCase())
        // );
        // setRestaurants(filtered);

        // setFilteredData(filtered);
        // setRestaurants(filtered);
        // goToMarker(0, listRestaurants)

        // Apply filters based on filteredSearch
        // const filteredRestaurants = allData.filter((restaurant) => {
        // Check isOpen
        // if (
        //   filteredSearch.isOpen !== undefined &&
        //   restaurant.isOpen !== filteredSearch.isOpen
        // ) {
        //   return false;
        // }

        /* // Check characteristics
        if (
          filteredSearch.characteristics &&
          filteredSearch.characteristics.length > 0 &&
          !filteredSearch.characteristics.some((char) =>
            restaurant.characteristics.includes(char)
          )
        ) {
          return false;
        }

        // Check especiality
        if (
          filteredSearch.typeOfMenu &&
          filteredSearch.typeOfMenu.especiality !== undefined &&
          restaurant.especiality !== filteredSearch.typeOfMenu.especiality
        ) {
          return false;
        }
        if (
          filteredSearch.typeOfMenu &&
          filteredSearch.typeOfMenu.complete_menu !== undefined &&
          restaurant.complete_menu !== filteredSearch.typeOfMenu.complete_menu
        ) {
          return false;
        } */

        //   return true;
        // });

        // setRestaurants(filteredRestaurants);
        // setData(filteredRestaurants);

        //  console.log("Filtered Restaurants:", filteredRestaurants);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // updateOpenStatus(data);
  }, [filteredSearch, search]);

  const getOpeningHoursForCurrentDay = (restaurant) => {
    const currentDay = moment().format("dddd").toLowerCase();
    return restaurant.opening_hours && restaurant.opening_hours[currentDay]
      ? restaurant.opening_hours[currentDay]
      : "Horário não disponível para o dia atual";
  };

  const isRestaurantOpen = (currentTime, { open, closed }) => {
    return currentTime >= open && currentTime <= closed ? "Aberto" : "Fechado";
  };

  // const updateOpenStatus = async (data) => {
  //   const currentTime = moment().format("HH:mm");

  //   const updatedRestaurants = data.map(async (restaurant) => {
  //     const openingHours = getOpeningHoursForCurrentDay(restaurant);
  //     const isOpen = isRestaurantOpen(currentTime, openingHours) === "Aberto";
  //     await RestaurantService.updateRestaurantById({
  //       id_restaurant: restaurant._id.$oid,
  //       isOpen: isOpen,
  //       updated_at: "",
  //       opening_hours: restaurant.opening_hours,
  //       address: restaurant.address,
  //       categories: restaurant.categories,
  //       characteristics: restaurant.characteristics,
  //       complete_menu: restaurant.complete_menu,
  //       contact: restaurant.contact,
  //       description: restaurant.description,
  //       email: restaurant.email,
  //       especialty: restaurant.especialty,
  //       img: restaurant.img,
  //       latitude: restaurant.latitude,
  //       longitude: restaurant.latitude,
  //       name: restaurant.name,
  //     });

  //     return { ...restaurant, isOpen };
  //   });
  //   const updatedRestaurantsData = await Promise.all(updatedRestaurants);
  //   // setRestaurants(updatedRestaurantsData);
  //   setData(updatedRestaurantsData);
  // };

  const renderItem = ({ item, index }) => {
    const isFavorite = favoriteIds.includes(item._id.$oid);
    return (
      <Pressable
        style={styles.carouselItem}
      >
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
      </Pressable>
    );
  };

  return (
    <Carousel
      ref={carouselRef}
      data={listRestaurants}
      renderItem={renderItem}
      sliderWidth={350} // Largura do slider
      itemWidth={290} // Largura de cada item
      itemHeight={152}
      style={styles.carousel}
      enableMomentum
      onSnapToItem={(e) => {
        goToMarker(e, listRestaurants);
        console.log(e, listRestaurants);
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
    fontFamily: "Roboto",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "400",
  },
  description: {
    flexShrink: 0,
    color: Colors.colors.neutral02Color.neutral_04,
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    borderRadius: 100,
  },
};

export default RestaurantsCardCarousel;
