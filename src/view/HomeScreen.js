import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import SearchBar2 from './../components/SearchBar2';
import FiltersModal from './../components/FiltersModal';
import Carousel from 'react-native-snap-carousel';
import { RestaurantService } from 'deliziora-client-module/client-web';
import { setAllRestaurants } from '../redux/features/restaurants/restaurantsSlice';
import RestaurantCard from './../components/RestaurantCard';
import MarkersRestaurant from './../components/MarkersRestaurant';

const windowWidth = Dimensions.get('window').width;

function HomeScreen() {
  const allRestaurants = useSelector(state => state.restaurants.allRestaurants);
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  useEffect(() => {
    RestaurantService.returnAllRestaurants()
      .then(res => {
        dispatch(setAllRestaurants(res.data));
        console.log("pegou", res.data);
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }, [dispatch]);

  const handleChangeSlide = (index) => {
    if (mapRef.current && allRestaurants[index]) {
      const { latitude, longitude } = allRestaurants[index];
      mapRef.current.animateToRegion({
        latitude,
        longitude,
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
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MarkersRestaurant />
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
          zIndex: 1
        }}
      >
        <SearchBar2 />
        <FiltersModal />
      </View>
      <View style={{
        width: "100%",
        height: 200,
        position: "absolute",
        alignSelf: "center",
        bottom: 20,
        left: 0,
        right: 0,
        zIndex: 1,
      }}>
        <Carousel
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center"
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
    left: 0
  },
});

export default HomeScreen;
