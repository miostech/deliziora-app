import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  BackHandler,
} from "react-native";
import { setAllRestaurants } from "../redux/features/restaurants/restaurantsSlice";
import { RestaurantService } from "deliziora-client-module/client-web";
import RestaurantCard from "./RestaurantCard";
import { useFocusEffect } from "@react-navigation/native";
import SearchBar2 from "./../components/SearchBar2";
import FiltersModal from "./../components/FiltersModal";
const HomeAndFavorites = () => {
  
  const allrestaurants = useSelector(
    (state) => state.restaurants.allRestaurants
  );
  const favoriteRestaurants = useSelector(
    (state) => state.restaurants.favoriteRestaurants
  );
  const dispatch = useDispatch();
  const [justRestaurantsFavorite, setJustRestaurantsFavorite] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Do nothing when back button is pressed
        return true;
      };

      // Add event listener for hardware back press
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      // Clean up the event listener
      return () => backHandler.remove();
    }, [])
  );

  useEffect(() => {
    RestaurantService.returnAllRestaurants()
      .then((res) => {
        dispatch(setAllRestaurants(res.data));
        console.log("pegou", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [dispatch]);

  useEffect(() => {
    const favoriteRestaurantsDetails = allrestaurants.filter((restaurant) =>
      favoriteRestaurants.includes(restaurant._id.$oid)
    );
    setJustRestaurantsFavorite(favoriteRestaurantsDetails);
  }, [favoriteRestaurants, allrestaurants]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "90%",
          height: "10%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          alignSelf: "center",
          top: 45,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <SearchBar2 />
        <FiltersModal />
      </View>
      <View style={styles.favoritesContainer}>
        <Text style={styles.title}>Restaurantes favoritos</Text>
        <ScrollView
          style={styles.scrollView}>
          {justRestaurantsFavorite.map((restaurant) => (
            <>
              <View style={{
                width: "100%",
                height: 30,
              }}></View>
              <RestaurantCard
                key={restaurant._id.$oid}
                id={restaurant._id.$oid}
                name={restaurant.name}
                description={restaurant.description}
                distance={"5"}
                type="complete"
                imageUri={restaurant.img}
                enableMomentum
              /></>

          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  favoritesContainer: {
    flex: 1,
    width: "90%",
    marginTop: 60,
    gap: 20,

  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
});

export default HomeAndFavorites;
