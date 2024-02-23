import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import SearchBar2 from "./../components/SearchBar2";
import FiltersModal from "./../components/FiltersModal";
import Carousel from "react-native-snap-carousel";
import {
  MenuOfTheDayService,
  MenuService,
  RestaurantService,
} from "deliziora-client-module/client-web";
import {
  setAllRestaurants,
  setAllRestaurantsOpen,
} from "../redux/features/restaurants/restaurantsSlice";
import { setMenuOfDay } from "../redux/features/menuOfDaySlice/menuOfDaySlice";
import RestaurantCard from "./../components/RestaurantCard";
import MarkersRestaurant from "./../components/MarkersRestaurant";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const windowWidth = Dimensions.get("window").width;

function HomeScreen() {
  const allRestaurants = useSelector(
    (state) => state.restaurants.allRestaurants
  );
  const menuOfDay = useSelector((state) => state.menuOfDay);
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(allRestaurants);
  const [menuOfTheDayByRestaurant, setMenuOfTheDayByRestaurant] = useState({});
  const [loading, setLoading] = useState(true);
  const mapsRef = useRef(null);
  const CarrouselRef = useRef(null);

  useEffect(() => {
    RestaurantService.returnAllRestaurants()
      .then((res) => {
        dispatch(setAllRestaurants(res.data));
        setFilteredRestaurants(res.data);
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão para acessar a localização foi negada");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  async function getInitialValues() {
    try {
      const today = new Date().getDay(); // Get the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const restaurants = allRestaurants; // Add your array of restaurant objects here
      const promises = [];

      await restaurants.forEach(async (element) => {
        const menuOfRestaurant =
          await MenuOfTheDayService.returnAllMenuOfDayByRestaurant(
            element._id.$oid
          );
        console.warn("MENU", menuOfRestaurant);
        if (
          menuOfRestaurant &&
          menuOfRestaurant.data &&
          menuOfRestaurant.data.length > 0
        ) {
          const menuItems = menuOfRestaurant.data.filter(
            (item) => item.day === today
          );
          console.warn("WARN", menuItems);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

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
          // getInitialValues();
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, [])
  );

  useEffect(() => {
    if (searchResult?.name) {
      const filtered = allRestaurants.filter((restaurant) => {
        return restaurant.name
          .toLowerCase()
          .includes(searchResult.name.toLowerCase());
      });
      setFilteredRestaurants(filtered);
    } else {
      // If no search result, display all restaurants
      setFilteredRestaurants(allRestaurants);
    }
  }, [searchResult]);

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

    if (foundRestaurants.length > 0 && mapsRef.current) {
      const coordinates = foundRestaurants.map((restaurant) => ({
        latitude: Number(restaurant.latitude),
        longitude: Number(restaurant.longitude),
      }));

      // Fit map to the coordinates
      mapsRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 300, right: 300, bottom: 300, left: 300 }, // Adjust padding as needed
        animated: true,
        
      });
    }
    setFilteredRestaurants(foundRestaurants);
  };

  const handleChangeSlide = (index) => {
    if (mapsRef.current && filteredRestaurants[index]) {
      const { latitude, longitude } = filteredRestaurants[index];
      mapsRef.current.animateToRegion({
        latitude: Number(latitude),
        longitude: Number(longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const renderCarouselItem = ({ item }) => (
    <RestaurantCard
      key={item.id}
      id={item._id.$oid}
      name={item.name}
      description={item.description}
      distance={item.distance}
      type="complete"
      imageUri={item.img}
      enableMomentum
    />
  );

  const onLayoutRootView = useCallback(async () => {
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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <MapView
        ref={mapsRef}
        style={styles.map}
        provider="google"
        maxZoomLevel={30}
        showsUserLocation
        initialRegion={{
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MarkersRestaurant
          CarrouselRef={CarrouselRef}
          setSearchResult={setSearchResult}
          setSearchTerm={setSearchTerm}
        />
      </MapView>

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
          top: 40,
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
      <View
        style={{
          width: "100%",
          height: 200,
          position: "absolute",
          alignSelf: "center",
          bottom: 20,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <Carousel
          ref={CarrouselRef}
          data={filteredRestaurants}
          renderItem={renderCarouselItem}
          style={styles.cardListStyle}
          sliderWidth={windowWidth}
          enableMomentum
          itemWidth={windowWidth * 0.87}
          itemHeight={200}
          onSnapToItem={handleChangeSlide} // Adiciona esta propriedade para chamar handleChangeSlide quando o slide muda
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
  },
  cardList: {
    width: "100%",
    height: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  cardListStyle: {
    position: "absolute",
    left: 0,
  },
});

export default HomeScreen;
