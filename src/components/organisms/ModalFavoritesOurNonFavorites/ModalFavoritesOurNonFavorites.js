import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import {
  setAllRestaurants,
  toggleFavorite,
  setFilteredRestaurants,
  
} from "../../../redux/features/restaurants/restaurantsSlice";
import {
  MenuOfTheDayService,
  MenuService,
  RestaurantService,
} from "deliziora-client-module/client-web";
import SearchBar2 from "../../SearchBar2";
import FiltersModal from "../../FiltersModal";
import RestaurantCard from "../../RestaurantCard";
import listType from "../../../redux/features/listTypeSlice/listTypeSlice";
import { useFocusEffect } from "@react-navigation/native";
import { setMenuOfDay } from "../../../redux/features/menuOfDaySlice/menuOfDaySlice";

const ModalFavoritesOurNonFavorites = () => {
  const listType = useSelector((state) => state.listType);
  const allRestaurants = useSelector(
    (state) => state.restaurants.allRestaurants
  );
  const menuOfDay = useSelector((state) => state.menuOfDay);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const [menuOfTheDayByRestaurant, setMenuOfTheDayByRestaurant] = useState({});
  const dispatch = useDispatch();
  const filteredRestaurants = useSelector(
    (state) => state.restaurants.filteredRestaurants
  );
  
  const IsActiveFilters = useSelector(
    (state) => state.restaurants.filtersIsActive
  );
  useEffect(() => {
    RestaurantService.returnAllRestaurants()
      .then((res) => {
        dispatch(setAllRestaurants(res.data));
        if (!IsActiveFilters) {
          dispatch(setFilteredRestaurants(res.data));
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [dispatch]);

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

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = () => {
        try {
          RestaurantService.returnAllRestaurants()
            .then((allRestauranteCurrent) => {
              const today = new Date().getDay(); // Get the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
              const restaurants = allRestauranteCurrent.data; // Add your array of restaurant objects here
              const promises = [];

              for (const restaurant of restaurants) {
                const promise =
                  MenuOfTheDayService.returnAllMenuOfDayByRestaurant(
                    restaurant._id.$oid
                  )
                    .then((responseMenuOfTheDay) => {
                      if (
                        responseMenuOfTheDay &&
                        responseMenuOfTheDay.data &&
                        responseMenuOfTheDay.data.length > 0
                      ) {
                        // Filter menu items for the current day and current restaurant
                        const menuItems = responseMenuOfTheDay.data.filter(
                          (item) => item.day === today
                        );

                        // Fetch menu details for the filtered menu items
                        const menuIds = menuItems.map((item) => item.id_menu);
                        return MenuService.returnAllMenu().then(
                          (responseMenuItems) => {
                            const filteredMenuItems =
                              responseMenuItems.data.filter((item) =>
                                menuIds.includes(item._id.$oid)
                              );

                            // Add restaurant name and plates of the day to the JSON object
                            return {
                              restaurantName: restaurant.name,
                              menuItems: filteredMenuItems.map(
                                (item) => item.name
                              ),
                            };
                          }
                        );
                      }
                    })
                    .catch((error) => console.error(error));

                promises.push(promise);
              }

              Promise.all(promises).then((menuDataArray) => {
                const menuOfTheDayByRestaurant = {};
                menuDataArray.forEach((menuData) => {
                  if (menuData) {
                    menuOfTheDayByRestaurant[menuData.restaurantName] =
                      menuData.menuItems;
                  }
                });

                // Set the menuOfTheDayByRestaurant state
                setMenuOfTheDayByRestaurant(menuOfTheDayByRestaurant);
                dispatch(setMenuOfDay(menuOfTheDayByRestaurant));
                setLoading(false);
              });
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, [])
  );

  useEffect(() => {
    if (!searchTerm && IsActiveFilters === false) {
      dispatch(setFilteredRestaurants(allRestaurants));
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchResult?.name) {
      const filtered = allRestaurants.filter((restaurant) => {
        return restaurant.name
          .toLowerCase()
          .includes(searchResult.name.toLowerCase());
      });
      dispatch(setFilteredRestaurants(filtered));
    } else {
      if (IsActiveFilters === false) {
        dispatch(setFilteredRestaurants(allRestaurants));
      }
    }
  }, [searchResult, searchTerm]);

  const handleSearch = () => {
    let foundRestaurants = [];

    // Search for restaurants with names containing the search term
    foundRestaurants = allRestaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log("plates", menuOfDay);

    // Search for restaurants with plates containing the search term
    const restaurantsWithSimilarPlates = allRestaurants.filter((restaurant) => {
      const plates = menuOfDay[restaurant.name] || [];
      return plates.some((plate) =>
        plate.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Combine the results from both searches
    foundRestaurants = foundRestaurants.concat(restaurantsWithSimilarPlates);

    // Remove duplicates
    foundRestaurants = [...new Set(foundRestaurants)];

    console.log(foundRestaurants[0]);

    dispatch(setFilteredRestaurants(foundRestaurants));
  };

  const onLayoutRootView = React.useCallback(async () => {
    if (loading) {
      await SplashScreen.hideAsync();
      navigation.setOptions({
        headerShown: true,
      });
    }
  }, [loading]);
  if (loading) {
    return (
      <View style={{ marginTop: 90 }}>
        <ActivityIndicator size="large" color="#f36527" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
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
        <SearchBar2
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
        <FiltersModal />
      </View>
      <View style={styles.favoritesContainer}>
        <Text style={styles.title}>Lista de Restaurantes</Text>
        <ScrollView style={styles.scrollView}>
          {filteredRestaurants.map((restaurant) => (
            <View
              key={restaurant._id.$oid}
              style={{ width: "100%", height: 180 }}
            >
              <RestaurantCard
                id={restaurant._id.$oid}
                name={restaurant.name}
                description={restaurant.description}
                latitude={restaurant.latitude}
                longitude={restaurant.longitude}
                distance={"5"}
                type="complete"
                imageUri={restaurant.img}
                enableMomentum
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: listType == false ? "flex" : "flex",
    height: "90%",
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
    height: "100%",
    marginBottom: 10,
  },
  favoriteButton: {
    textAlign: "center",
    color: "blue",
    marginTop: 5,
  },
});

export default ModalFavoritesOurNonFavorites;
