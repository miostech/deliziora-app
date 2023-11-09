import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import MarkersRestaurant from "../components/MarkersRestaurant";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Loader from "../components/Loader";
import MarkerCurrentLocationIconComponent from "../components/MarkerCurrentLocationIconComponent";
import SearchBar from "../components/SearchBar";
import * as Device from 'expo-device';
import CarouselMapContext from "../components/CarouselMapContext";

export default function MapScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [messageLocation, setMessageLocation] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  const { handleMarkerPress, location, setLocation, mapRef } =
    useContext(CarouselMapContext);

  var colors = require("../style/Colors.json");

  const maps = useRef(null);

  useEffect(() => {
    console.log("OPEN", MapScreen.name, "SCREEN");
    GetLocation();
    return () => {
      console.log("SCREEN", MapScreen.name, "CLOSE");
    };
  }, []);

  function GetLocation() {
    return new Promise(async (resolve, reject) => {
      if (location?.coords?.latitude != undefined) {
        setIsLoading(false);
        resolve("sucess");
        return;
      } else {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          reject("Permission to access location was denied");
          return;
        }
        console.log("GET LOCATION");
        let location = await Location.getCurrentPositionAsync({});
        console.log("LOCATION", location);
        setLocation(location);
        setMessageLocation(
          location.coords.latitude + " " + location.coords.longitude
        );
        resolve("sucess");
      }
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
            ref={maps}
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
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            initialRegion={{
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <MarkersRestaurant restaurants={restaurants} />
            <Marker
              key={"CurrentLocation"}
              identifier="CurrentLocation"
              draggable={true}
              onDrag={(e) => {
                console.log(e.nativeEvent?.coordinate);
              }}
              coordinate={{
                latitude: location?.coords?.latitude,
                longitude: location?.coords?.longitude,
              }}
            >
              <MarkerCurrentLocationIconComponent />
            </Marker>
          </MapView>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    position: "relative",
  },
});
