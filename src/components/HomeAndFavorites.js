import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  BackHandler,
} from "react-native";
import { setAllRestaurants } from "../redux/features/restaurants/restaurantsSlice";
import { RestaurantService } from "deliziora-client-module/client-web";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantCard from "./RestaurantCard";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import SearchBar2 from "./SearchBar2";
import ModalFavoritesOrNonFavorites from "./organisms/ModalFavoritesOurNonFavorites/ModalFavoritesOurNonFavorites";
import { Path, Svg } from "react-native-svg";
import FiltersModal from "./FiltersModal";
import { useFocusEffect } from "@react-navigation/native";
const colors = require("./../style/Colors.json");
const windowWidth = Dimensions.get("window").width;
const HomeAndFavorites = () => {
  const allrestaurants = useSelector(
    (state) => state.restaurants.allRestaurants
  );
  const favoriteRestaurants = useSelector(
    (state) => state.restaurants.favoriteRestaurants
  );
  const dispatch = useDispatch();
  const [justRestaurantsFavorite, setJustRestaurantsFavorite] = useState([]);
  const [nonFavoriteRestaurants, setNonFavoriteRestaurants] = useState([]);
  const [favoriteModalVisible, setFavoriteModalVisible] = useState(false);
  const [nonFavoriteModalVisible, setNonFavoriteModalVisible] = useState(false);

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
    RestaurantService.returnAllRestaurants()
      .then((res) => {
        dispatch(setAllRestaurants(res.data));
        console.log("pegou", res.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [dispatch]);

  useEffect(() => {
    const favoriteRestaurantsDetails = allrestaurants.filter((restaurant) =>
      favoriteRestaurants.includes(restaurant._id.$oid)
    );
    setJustRestaurantsFavorite(favoriteRestaurantsDetails);

    const nonFavoriteRestaurantsDetails = allrestaurants.filter(
      (restaurant) => !favoriteRestaurants.includes(restaurant._id.$oid)
    );
    setNonFavoriteRestaurants(nonFavoriteRestaurantsDetails);
  }, [favoriteRestaurants, allrestaurants]);

  const openFavoriteModal = () => {
    setFavoriteModalVisible(true);
  };

  const closeFavoriteModal = () => {
    setFavoriteModalVisible(false);
  };

  const openNonFavoriteModal = () => {
    setNonFavoriteModalVisible(true);
  };

  const closeNonFavoriteModal = () => {
    setNonFavoriteModalVisible(false);
  };

  const renderRestaurantCard = ({ item }) => (
    <RestaurantCard
      key={item._id.$oid}
      id={item._id.$oid}
      name={item.name}
      description={item.description}
      distance={"5"}
      type="complete"
      imageUri={item.img}
      enableMomentum
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          marginRight: 20,
        }}
      >
        <SearchBar2 />
        <FiltersModal />
      </View>

      <View style={styles.favoritesContainer}>
        <View style={{ width: "100%", justifyContent: "flex-start" }}>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Restaurantes favoritos</Text>
            {justRestaurantsFavorite.length > 0 && (
              <Pressable onPress={openFavoriteModal}>
                <Text style={styles.seeMore}>Ver mais</Text>
              </Pressable>
            )}
          </View>
          <View style={styles.cardList}>
            {justRestaurantsFavorite.length === 0 ? (
              <Svg
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.2702 13.61L2.35019 9.61C2.07803 9.42356 1.91532 9.11489 1.91532 8.785C1.91532 8.4551 2.07803 8.14643 2.35019 7.96L10.2702 3.96C10.6838 3.75579 11.1389 3.64971 11.6002 3.64999C12.0204 3.65226 12.4356 3.74075 12.8202 3.91L21.6102 7.91C21.9285 8.08611 22.1261 8.42121 22.1261 8.785C22.1261 9.14879 21.9285 9.48388 21.6102 9.66L12.8202 13.66C12.4356 13.8292 12.0204 13.9177 11.6002 13.92C11.1389 13.9203 10.6838 13.8142 10.2702 13.61ZM11.6502 5.11C11.4248 5.10843 11.2021 5.15981 11.0002 5.26L4.00019 8.75L11.0002 12.23C11.2021 12.3302 11.4248 12.3816 11.6502 12.38C11.8574 12.3823 12.0625 12.3378 12.2502 12.25L19.9602 8.75L12.2502 5.24C12.0625 5.15216 11.8574 5.10773 11.6502 5.11Z"
                  fill="#F36527"
                />
                <Path
                  d="M21.2902 12.05L12.4402 15.74C11.8989 15.996 11.2715 15.996 10.7302 15.74L2.89019 12.06C2.64546 11.9475 2.35929 11.974 2.13946 12.1297C1.91964 12.2854 1.79956 12.5465 1.82446 12.8147C1.84937 13.0829 2.01546 13.3175 2.26019 13.43L10.0802 17.05C10.5654 17.29 11.0989 17.4165 11.6402 17.42C12.124 17.4212 12.6021 17.3153 13.0402 17.11L21.8602 13.44C22.0498 13.3649 22.2006 13.2159 22.2779 13.0272C22.3553 12.8386 22.3525 12.6265 22.2702 12.44C22.1016 12.0676 21.6686 11.8953 21.2902 12.05Z"
                  fill="#F36527"
                />
                <Path
                  d="M21.2902 15.13L12.4402 18.82C11.8989 19.076 11.2715 19.076 10.7302 18.82L2.89019 15.15C2.64541 15.0247 2.35166 15.0433 2.12472 15.1987C1.89778 15.354 1.77406 15.6211 1.80232 15.8946C1.83058 16.1682 2.00629 16.4043 2.26019 16.51L10.0802 20.13C10.5606 20.3733 11.0916 20.5001 11.6302 20.5C12.104 20.4974 12.5715 20.3917 13.0002 20.19L21.8202 16.52C22.0098 16.4449 22.1606 16.2959 22.2379 16.1072C22.3153 15.9186 22.3125 15.7065 22.2302 15.52C22.0597 15.172 21.657 15.0049 21.2902 15.13Z"
                  fill="#F36527"
                />
              </Svg>
            ) : (
              <Carousel
                data={justRestaurantsFavorite}
                sliderWidth={windowWidth}
                x
                itemWidth={windowWidth * 0.75}
                itemHeight={190}
                enableMomentum
                renderItem={renderRestaurantCard}
                keyExtractor={(item) => item._id.$oid}
                style={styles.cardListStyle}
              />
            )}
          </View>
        </View>
      </View>
      <View style={styles.nonFavoritesContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.title}>Demais restaurantes</Text>
          {nonFavoriteRestaurants.length > 0 && (
            <Pressable onPress={openNonFavoriteModal}>
              <Text style={styles.seeMore}> Ver mais</Text>
            </Pressable>
          )}
        </View>
        <View style={styles.cardList}>
          {nonFavoriteRestaurants.length === 0 ? (
            <Svg
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.2702 13.61L2.35019 9.61C2.07803 9.42356 1.91532 9.11489 1.91532 8.785C1.91532 8.4551 2.07803 8.14643 2.35019 7.96L10.2702 3.96C10.6838 3.75579 11.1389 3.64971 11.6002 3.64999C12.0204 3.65226 12.4356 3.74075 12.8202 3.91L21.6102 7.91C21.9285 8.08611 22.1261 8.42121 22.1261 8.785C22.1261 9.14879 21.9285 9.48388 21.6102 9.66L12.8202 13.66C12.4356 13.8292 12.0204 13.9177 11.6002 13.92C11.1389 13.9203 10.6838 13.8142 10.2702 13.61ZM11.6502 5.11C11.4248 5.10843 11.2021 5.15981 11.0002 5.26L4.00019 8.75L11.0002 12.23C11.2021 12.3302 11.4248 12.3816 11.6502 12.38C11.8574 12.3823 12.0625 12.3378 12.2502 12.25L19.9602 8.75L12.2502 5.24C12.0625 5.15216 11.8574 5.10773 11.6502 5.11Z"
                fill="#F36527"
              />
              <Path
                d="M21.2902 12.05L12.4402 15.74C11.8989 15.996 11.2715 15.996 10.7302 15.74L2.89019 12.06C2.64546 11.9475 2.35929 11.974 2.13946 12.1297C1.91964 12.2854 1.79956 12.5465 1.82446 12.8147C1.84937 13.0829 2.01546 13.3175 2.26019 13.43L10.0802 17.05C10.5654 17.29 11.0989 17.4165 11.6402 17.42C12.124 17.4212 12.6021 17.3153 13.0402 17.11L21.8602 13.44C22.0498 13.3649 22.2006 13.2159 22.2779 13.0272C22.3553 12.8386 22.3525 12.6265 22.2702 12.44C22.1016 12.0676 21.6686 11.8953 21.2902 12.05Z"
                fill="#F36527"
              />
              <Path
                d="M21.2902 15.13L12.4402 18.82C11.8989 19.076 11.2715 19.076 10.7302 18.82L2.89019 15.15C2.64541 15.0247 2.35166 15.0433 2.12472 15.1987C1.89778 15.354 1.77406 15.6211 1.80232 15.8946C1.83058 16.1682 2.00629 16.4043 2.26019 16.51L10.0802 20.13C10.5606 20.3733 11.0916 20.5001 11.6302 20.5C12.104 20.4974 12.5715 20.3917 13.0002 20.19L21.8202 16.52C22.0098 16.4449 22.1606 16.2959 22.2379 16.1072C22.3153 15.9186 22.3125 15.7065 22.2302 15.52C22.0597 15.172 21.657 15.0049 21.2902 15.13Z"
                fill="#F36527"
              />
            </Svg>
          ) : (
            <Carousel
              data={nonFavoriteRestaurants}
              sliderWidth={windowWidth}
              itemWidth={windowWidth * 0.75}
              itemHeight={190}
              enableMomentum
              renderItem={renderRestaurantCard}
              keyExtractor={(item) => item._id.$oid}
              style={styles.cardListStyle}
            />
          )}
        </View>
      </View>
      {justRestaurantsFavorite && justRestaurantsFavorite.length > 0 && (
        <ModalFavoritesOrNonFavorites
          isVisible={favoriteModalVisible}
          isFavorite={true}
          onClose={closeFavoriteModal}
          restaurantData={justRestaurantsFavorite}
        />
      )}
      {nonFavoriteRestaurants && nonFavoriteRestaurants.length > 0 && (
        <ModalFavoritesOrNonFavorites
          isVisible={nonFavoriteModalVisible}
          isFavorite={false}
          onClose={closeNonFavoriteModal}
          restaurantData={nonFavoriteRestaurants}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  favoritesContainer: {
    width: "100%",
    height: "35%",
    marginTop: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: "2%",
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
  sectionHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "right",
    padding: "2%",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  seeMore: {
    color: colors.colors.baseColor.base_01,
    textAlign: "right",
    fontFamily: "Roboto",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    padding: "2%",
  },
  restaurantListContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 12,
  },
  favoritesContainer: {
    width: "100%",
    height: "35%",
    marginTop: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "2%",
  },
  nonFavoritesContainer: {
    width: "98%",
    height: "35%",
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "2%",
  },
  title: {
    textAlign: "right",
    padding: "2%",
    marginLeft: 10,
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  seeMoreFavorites: {
    color: colors.colors.baseColor.base_01,
    textAlign: "right",
    fontFamily: "Roboto",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    padding: "2%",
  },
  favoritesListContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 12,
  },
  restaurantItem: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  restaurantTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 10,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default HomeAndFavorites;
