import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
} from "react";
import {
  SafeAreaView,
  StatusBar,
  Appearance,
  useColorScheme,
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import RestaurantsCardCarousel from "../components/RestaurantsCardCarousel";
import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";
import MarkersRestaurant from "../components/MarkersRestaurant";
import CarouselMapContext from "../components/CarouselMapContext";
import MarkerCurrentLocationComponent from "../components/MarkerCurrentLocationIconComponent";
import CurrentLocationMarker from "../components/CurrentLocationMarker";
import MarkerCurrentLocationIconComponent from "../components/MarkerCurrentLocationIconComponent";
import * as Device from 'expo-device';

export default function HomeScreen({ route, navigation }) {
  const { handleMarkerPress, location, setLocation, mapRef } =
    useContext(CarouselMapContext);

  const [isLoading, setIsLoading] = useState(true);
  const [messageLocation, setMssageLocation] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  var colors = require("../style/Colors.json");

  const maps = useRef(null);

  useEffect(() => {
    console.log("OPEN", HomeScreen.name, "SCREEN");
    GetLocation();
    return () => {
      console.log("SCREEN", HomeScreen.name, "CLOSE");
    };
  }, []);

  function GetLocation() {
    return new Promise(async (resolve, reject) => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        reject("Permission to access location was denied");
        return;
      }
      console.log("DEVICE", Device.brand);
      console.log("GET LOCATION");
      let location = await Location.getCurrentPositionAsync({});
      console.log("LOCATION", location);
      setLocation(location);
      setMessageLocation(
        location.coords.latitude + " " + location.coords.longitude
      );
      resolve("sucess");
    });
  }

  useEffect(() => {
    console.warn("HERE", location);
    if (
      location?.coords?.latitude != undefined ||
      location?.coords?.latitude != null
    ) {
      setIsLoading(false);
    }
  }, [location]);

  const onLayoutRootView = useCallback(async () => {
    if (isLoading) {
      GetLocation();
    }
  }, [isLoading]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <View>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <View
          style={{
            width: "100%",
            position: "absolute",
            zIndex: 1,
            alignItems: "center",
            marginTop: Device.brand == "Apple" ? 80 : 35,
          }}
        >
          <SearchBar />
        </View>
        <View>
          <MapView
            ref={mapRef}
            style={{
              height: Dimensions.get("window").height,
              width: Dimensions.get("window").width,
            }}
            zoomEnabled={true}
            showsUserLocation={false}
            showsMyLocationButton={false}
            provider="google"
            region={{
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
            initialRegion={{
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
          >
            <MarkersRestaurant restaurants={restaurants} />
          </MapView>
        </View>

        <View
          style={{
            width: "100%",
            height: 200,
            position: "absolute",
            alignItems: "center",
            bottom: 35,

          }}
        >
          <RestaurantsCardCarousel
            navigation={navigation}
            setRestaurants={setRestaurants}
          />
        </View>
      </View>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    position: "relative",
  },
});
