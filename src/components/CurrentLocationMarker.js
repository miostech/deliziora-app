import { View, Text } from "react-native";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
} from "react";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MarkerCurrentLocationIconComponent from "./MarkerCurrentLocationIconComponent";
import Loader from "./Loader";

export default function CurrentLocationMarker({ restaurants }) {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    GetLocation();
  }, []);

  function GetLocation() {
    return new Promise(async (resolve, reject) => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        reject("Permission to access location was denied");
        return;
      }
      console.log("GET LOCATION");
      let location = await Location.getCurrentPositionAsync({});
      console.log("LOCATIONMARKER", location);
      setLocation(location);
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
    <>
      <View onLayout={onLayoutRootView}>
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
      </View>
    </>
  );
}
