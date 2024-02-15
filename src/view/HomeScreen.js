// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import SearchBar2 from './../components/SearchBar2';
import FiltersModal from './../components/FiltersModal';
import Carousel from 'react-native-snap-carousel';
import { RestaurantService } from 'deliziora-client-module/client-web';
import { setAllRestaurants } from '../redux/features/restaurants/restaurantsSlice';
import RestaurantCard from './../components/RestaurantCard'

const windowWidth = Dimensions.get('window').width;

function HomeScreen() {
  const allRestaurants = useSelector(state => state.restaurants.allRestaurants);
  const favoriteRestaurants = useSelector(state => state.restaurants.favoriteRestaurants);
  const dispatch = useDispatch();
  const [favoriteRestaurantsList, setFavoriteRestaurantsList] = useState([]);
  const [nonFavoriteRestaurantsList, setNonFavoriteRestaurantsList] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedRestaurantCoordinates, setSelectedRestaurantCoordinates] = useState(null);

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

  useEffect(() => {
    const favoriteRestaurantsDetails = allRestaurants.filter(restaurant => favoriteRestaurants.includes(restaurant.id)); // Altere para o campo correto do id do restaurante
    setFavoriteRestaurantsList(favoriteRestaurantsDetails);

    const nonFavoriteRestaurantsDetails = allRestaurants.filter(restaurant => !favoriteRestaurants.includes(restaurant.id)); // Altere para o campo correto do id do restaurante
    setNonFavoriteRestaurantsList(nonFavoriteRestaurantsDetails);
  }, [favoriteRestaurants, allRestaurants]);

  const renderCarouselItem = ({ item }) => (
    <RestaurantCard
      key={item.id}
      id={item.id}
      name={item.name}
      description={item.description}
      distance={item.distance}
      type="complete"
      imageUri={item.img}
      enableMomentum
      onPress={() => setSelectedRestaurantCoordinates({ latitude: item.latitude, longitude: item.longitude })}
    />
  );

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {selectedRestaurantCoordinates && (
            <Marker
              coordinate={selectedRestaurantCoordinates}
              title="Restaurante Selecionado"
              description="Coordenadas do Restaurante"
            />
          )}
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
          itemWidth={windowWidth * 0.75}
          itemHeight={190}
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