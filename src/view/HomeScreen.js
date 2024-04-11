import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
  Pressable,
  ActivityIndicator,
  Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import SearchBar2 from "./../components/SearchBar2";
import FiltersModal from "./../components/FiltersModal";
import Carousel from "react-native-snap-carousel";
import {
  AnonymousUserLocationService,
  MenuOfTheDayService,
  MenuService,
  RestaurantService,
} from "deliziora-client-module/client-web";
import {
  setAllRestaurants,
  setFilteredRestaurants,
} from "../redux/features/restaurants/restaurantsSlice";
import * as Device from "expo-device";
import { setMenuOfDay } from "../redux/features/menuOfDaySlice/menuOfDaySlice";
import RestaurantCard from "./../components/RestaurantCard";
import MarkersRestaurant from "./../components/MarkersRestaurant";
import { Link, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateLocation } from "../redux/features/locationSlice/locationSlice";
import MarkerIconCurrentComponent from "../components/MarkerIconCurrentComponent";
import { setCurrentRestaurantMarker } from "../redux/features/currentRestaurantMarker/CurrentRestaurantMarker";
import Toast from 'react-native-toast-message';
import RestaurantBadge from "../components/Atoms/RestaurantBadge";
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
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [userPermitedAccessLocation, setUserPermitedAccessLocation] = useState(null)
  /* const [filteredRestaurants, setFilteredRestaurants] =
    useState(allRestaurants); */
  const filteredRestaurants = useSelector(
    (state) => state.restaurants.filteredRestaurants
  );

  const IsActiveFilters = useSelector(
    (state) => state.restaurants.filtersIsActive
  );
  const [menuOfTheDayByRestaurant, setMenuOfTheDayByRestaurant] = useState({});
  const [loading, setLoading] = useState(true);
  const mapsRef = useRef(null);
  const CarrouselRef = useRef(null);

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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      var currentLocation = null;
      if (status !== "granted") {
        setErrorMsg("Permissão para acessar a localização foi negada");
        setLocation({ coords: { latitude: 38.70820288465464, longitude: -9.13673167964773 } })
        currentLocation = { coords: { latitude: 38.70820288465464, longitude: -9.13673167964773 } }
        Toast.show({
          text1: "Preicisa de permitir o acesso à localização",
          text2: "Por favor vá às definições e permita o acesso à localização",
          visibilityTime: 60000,
          type: "error",
          position: "top",
          onPress: () => {
            Linking.openSettings();
          },
        });
      }
      else {
        currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        console.log(
          "AQUII",
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
      }
      dispatch(
        updateLocation({
          location: {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          },
        })
      );
      const responseInfo = await fetch(
        `https://api.geodatasource.com/city?key=YKRGEZIEITLVMDUSF2M6HUPN9DMUFVRB&format=json&lat=${currentLocation.coords.latitude}&lng=${currentLocation.coords.longitude}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )

      console.warn("RESPONSE", responseInfo);

      var data = await responseInfo.json();

      console.warn("DATA", data);

      const id_user = await AsyncStorage.getItem("@userData");
      console.warn("ID", id_user);

      await AnonymousUserLocationService.createNewUserLocation({
        id_anonymous_user: id_user,
        district: data.city ? data.city : "",
        county: data.region ? data.region : "",
        parish: "",
        latitude: String(currentLocation.coords.latitude),
        longitude: String(currentLocation.coords.longitude),
        created_at: "",
      })
    })();
  }, []);

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
    dispatch(setFilteredRestaurants(foundRestaurants));
  };

  const handleChangeSlide = (index) => {
    if (mapsRef.current && filteredRestaurants[index]) {
      const { name } = filteredRestaurants[index];
      dispatch(setCurrentRestaurantMarker(name));
      console.warn("RESTAU", name)
      mapsRef.current.fitToSuppliedMarkers(["home", name], {
        edgePadding: {
          top: Device.brand == "Apple" ? 250 : Dimensions.get("window").height / 1.6,
          right: 0,
          bottom: Device.brand == "Apple" ? 250 : Dimensions.get("window").height / 1.6,
          left: 0,
        },
      });
    }
  };

  const renderCarouselItem = ({ item }) => (
    <RestaurantCard
      key={item.id}
      id={item._id.$oid}
      name={item.name}
      latitude={item.latitude}
      longitude={item.longitude}
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
          selectedRestaurant={selectedRestaurant}
        />
        <Marker
          key={"home"}
          identifier="home"
          coordinate={{
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
          }}
        >
          <MarkerIconCurrentComponent />
        </Marker>
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
          bottom: 10,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <RestaurantBadge />
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
    height: "100%",
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
