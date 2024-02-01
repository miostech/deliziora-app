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
import * as Device from "expo-device";
import ListMapRestaurant from "../components/ListMapRestaurant";
import { RestaurantService } from "deliziora-client-module/client-web";

export default function HomeScreen({ listType, route, navigation }) {
  const { handleMarkerPress, location, setLocation, mapRef, setListType, setUserLocation } =
    useContext(CarouselMapContext);

  const [isLoading, setIsLoading] = useState(true);
  const [filteredSearch, setFilteredSearch] = useState({});
  const [messageLocation, setMssageLocation] = useState("");
  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurant, setAllRestaurants] = useState([])

  var colors = require("../style/Colors.json");

  const maps = useRef(null);

  useEffect(() => {
    console.log("OPEN", HomeScreen.name, "SCREEN");
    GetLocation().then((res) => {
      setIsLoading(false);
    }).catch(err => {
      console.log("ERROR", err)
    });
    return () => {
      console.log("SCREEN", HomeScreen.name, "CLOSE");
    };
  }, []);

  useEffect(() => {
    RestaurantService.returnAllRestaurants().then(res => {
      setRestaurants(res.data);
      setAllRestaurants(res.data);
    }).catch(err => {
      console.log("ERROR", err)
    });
  }, []);

  useEffect(() => {
    // var filterList = allRestaurant.filter((f) => f.isOpen == filteredSearch.isOpen)
    // setRestaurants(filterList)
  }, [filteredSearch]);

  function GetLocation() {
    return new Promise(async (resolve, reject) => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("STATUS", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        reject("Permission to access location was denied");
        return;
      }
      console.log("DEVICE", Device.brand);
      console.log("GET LOCATION");
      Location.getLastKnownPositionAsync().then((location) => {
        console.log("LOCATION", location);
        setLocation(location);
        setUserLocation(location.coords);
        resolve("sucess");
      }).catch(err => {
        console.log("ERROR", err)
        reject(err);
      });
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
      GetLocation().then((res) => {
        setIsLoading(false);
      }).catch(err => {
        console.log("ERROR", err)
      });
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
          <SearchBar filteredSearch={filteredSearch} setFilteredSearch={setFilteredSearch} setSearch={setSearch} setListRestaurant={setRestaurants} listRestaurant={allRestaurant} filteredRestaurants={restaurants} search={search} />
        </View>
        {!listType ? (
          <View
            style={{
              height: Dimensions.get("window").height,
              width: Dimensions.get("window").width,
            }}
          >
            <ListMapRestaurant
              navigation={navigation}
              restaurants={restaurants}
            />
          </View>
        ) : (
          <>
            <View>
              <MapView
                ref={mapRef}
                style={{
                  height: Dimensions.get("window").height,
                  width: Dimensions.get("window").width,
                }}
                zoomEnabled={true}
                showsUserLocation={true}
                showsMyLocationButton={false}
                toolbarEnabled={false}
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
                location={location}
                filteredSearch={filteredSearch}
                search={search}
                listRestaurants={restaurants}
              />
            </View>
          </>
        )}
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
