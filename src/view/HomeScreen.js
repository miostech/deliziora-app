import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import SearchBar2 from "./../components/SearchBar2";
import FiltersModal from "./../components/FiltersModal";
import Carousel from "react-native-snap-carousel";
import { RestaurantService } from "deliziora-client-module/client-web";
import { setAllRestaurants, setAllRestaurantsOpen } from "../redux/features/restaurants/restaurantsSlice";
import RestaurantCard from "./../components/RestaurantCard";
import MarkersRestaurant from "./../components/MarkersRestaurant";
import { useFocusEffect } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

function HomeScreen() {
  const allRestaurants = useSelector(
    (state) => state.restaurants.allRestaurants
  );
  const allRestaurantsOpen = useSelector(
    (state) => state.restaurants.allRestaurantsOpen
  );

  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapsRef = useRef(null);
  const CarrouselRef = useRef(null);

  const getOpenRestaurants = (restaurants) => {
    const currentTime = new Date();
    const dayNames = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const dayName = dayNames[currentTime.getDay()];
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    return restaurants.filter((restaurant) => {
      const openingHours = restaurant.opening_hours;
      const today = openingHours[dayName];
      if (today) {
        const { open, closed } = today;
        const [openHour, openMinute] = open.split(":").map(Number);
        const [closedHour, closedMinute] = closed.split(":").map(Number);
        const openingTime = new Date();
        openingTime.setHours(openHour, openMinute, 0);

        const closingTime = new Date();
        closingTime.setHours(closedHour, closedMinute, 0);

        if (currentTime >= openingTime && currentTime <= closingTime) {
          return true;
        }
      }
      return false;
    });
  };

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

  useEffect(() => {
    RestaurantService.returnAllRestaurants()
      .then((res) => {
        console.log("restaurantes abertos", getOpenRestaurants(res.data));
        dispatch(setAllRestaurants(res.data));
        dispatch(setAllRestaurantsOpen(getOpenRestaurants(res.data)));
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [dispatch]);

  const handleChangeSlide = (index) => {
    if (mapsRef.current && allRestaurants[index]) {
      const { latitude, longitude } = allRestaurants[index];
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

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          ref={mapsRef}
          style={styles.map}
          provider="google"
          showsUserLocation
          initialRegion={{
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MarkersRestaurant CarrouselRef={CarrouselRef} />
        </MapView>
      ) : (
        <Text>Carregando...</Text>
      )}
      {errorMsg && <Text>{errorMsg}</Text>}
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
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <SearchBar2 />
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
          data={allRestaurants}
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
