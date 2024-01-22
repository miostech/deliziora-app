import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import { Linking } from "react-native";
import * as Device from "expo-device";
import moment from "moment";
import Close from "../components/SVGs/Close";
import PhoneIcon from "../components/PhoneIcon";
import GoogleMapsIcon from "../components/GoogleMapsIcon";
import StarIcon from "../components/SVGs/StarIcon";
import { Button } from "react-native-elements";
import {
  CharacteristicsService,
  MenuOfTheDayService,
  MenuService,
  RestaurantService,
} from "deliziora-client-module/client-web";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../components/Loader";
const Colors = require("../style/Colors.json");

export default function ProfileRestaurantPage({ route, navigation }) {
  console.log(route.params.restaurant.img);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [restaurant, setRestaurant] = useState(route.params.restaurant);
  const [location, setLocation] = useState(route.params.location);
  const [modalVisible, setModalVisible] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [plates, setPlates] = useState([]);
  const [day, setDay] = useState(0);
  const [characteristics, setCharacteristics] = useState([]);
  const currentDay = moment().format("dddd").toLowerCase();
  const daysMap = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
  };

  useEffect(() => {
    MenuService.returnAllMenu()
      .then((res) => {
        const filteredDataByRestaurantId = res.data.filter(
          (item) => item.id_Restaurants === restaurant._id.$oid
        );
        setPlates(filteredDataByRestaurantId);
      })
      .catch((err) => {
        console.error("ERROR ", err);
      });
  }, []);

  useEffect(() => {
    console.log("OPEN", ProfileRestaurantPage.name, "SCREEN");
    setRestaurant(route.params.restaurant);
    CharacteristicsService.returnAllCharacteristics()
      .then((dataCharacteristics) => {
        RestaurantService.returnRestaurantById(restaurant._id.$oid)
          .then((dataRes) => {
            const filteredRestaurantIds = dataCharacteristics.data
              .map((chacItem) => chacItem)
              .filter((item) =>
                dataRes.data.characteristics.includes(item._id.$oid)
              );
            setCharacteristics(filteredRestaurantIds);
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => {
        console.error("ERRO", error);
      });
    const fetchData = async () => {
      const numericDay = daysMap[currentDay];
      if (numericDay !== undefined && numericDay !== day) {
        setDay(numericDay);
      }
      try {
        const [resMenuDay, res] = await Promise.all([
          MenuOfTheDayService.returnAllMenuOfDayByRestaurant(
            restaurant._id.$oid
          ),
          MenuService.returnAllMenu(),
        ]);

        const matchingMenuItems = new Set();

        resMenuDay.data.forEach((itemDay) => {
          const matchingItemsForDay = res.data.filter(
            (item) => itemDay.id_menu === item._id.$oid && itemDay.day === day
          );
          console.log(matchingItemsForDay);
          matchingItemsForDay.forEach((matchingItem) => {
            matchingMenuItems.add(matchingItem);
          });
        });

        setMenuItems(Array.from(matchingMenuItems));
        console.log("aquii", menuItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setTimeout(() => {
      setIsLoading(true);
    }, 2000);
    return () => {
      console.log("SCREEN", ProfileRestaurantPage.name, "CLOSE");
      setMenuItems([]);
      setPlates([]);
    };
  }, [restaurant._id.$oid, day]);

  const getOpeningHoursForCurrentDay = () => {
    const currentDay = moment().format("dddd").toLowerCase();
    console.log("aqui", currentDay);
    if (restaurant.opening_hours && restaurant.opening_hours[currentDay]) {
      return restaurant.opening_hours[currentDay];
    }
    return "Horário não disponível para o dia atual";
  };

  const currentOpeningHours = getOpeningHoursForCurrentDay();

  const isRestaurantOpen = () => {
    const currentTime = moment().format("HH:mm");
    console.log(open);
    console.log(currentTime);
    console.log(currentOpeningHours);
    const { open, closed } = currentOpeningHours;

    if (currentTime <= closed && currentTime >= open) {
      return "Aberto";
    } else {
      return "Fechado";
    }
  };

  const restaurantStatus = isRestaurantOpen();

  const coordinatesNavigateGoogle = `https://www.google.com/maps/dir/?api=1&origin=${location?.coords.latitude},${location?.coords.longitude}&destination=${restaurant?.latitude},${restaurant?.longitude}&travelmode=driving`;

  /*  const handleItemPress = (e) => {
     console.log("PLATE", e);
     navigation.navigate("MenuPlatesPage", {
       namePlate: e,
     });
   }; */

  const RenderItem = ({ item, index }) => {
    const itemStyle = styles.item;
    const nameStyle = styles.itemName;
    return (
      <View
        style={{
          marginRight: 10,
          justifyContent: "space-between",
          flexDirection: "row",
          width: 330,
          borderBottomWidth: 1,
          marginBottom: 20,
        }}
      >
        <Text style={nameStyle}>{item.name}</Text>
        <Text style={nameStyle}>€{item.price}</Text>
      </View>
    );
  };

  const onLayoutRootView = useCallback(async () => {
    if (isLoading) {
      
    }
  }, [isLoading]);
  if (!isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={{ flex: 0.3 }}>
        <Image
          resizeMode="cover"
          source={{ uri: restaurant.img }}
          style={styles.imageRestaurant}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: 30,
          backgroundColor: "white",
          borderRadius: 24,
          marginTop: -10,
        }}
      ></View>
      <ScrollView
        vertical={true}
        showsHorizontalScrollIndicator={false}
        style={styles.containerRestaurantInfo}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.restaurantTitleInfo}>
          <Text style={styles.textRestaurantTitleInfo}>{restaurant.name}</Text>
          <View
            style={[
              {
                marginBottom: 15,
                marginTop: 15,
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: 330,
              },
            ]}
          >
            <View style={[styles.row, { alignItems: "center" }]}>
              <View style={styles.phoneNumberCall}>
                <Pressable
                  onPress={() => {
                    Linking.openURL(coordinatesNavigateGoogle);
                  }}
                >
                  <GoogleMapsIcon />
                </Pressable>
              </View>
              <Text style={styles.textRestaurantNormalInfo}>
                {restaurant.address}
              </Text>
            </View>
            <View style={[styles.row, { alignItems: "center" }]}>
              <View style={styles.phoneNumberCall}>
                <Pressable
                  onPress={() => {
                    Linking.openURL(`tel:${restaurant.contact}`);
                  }}
                >
                  <PhoneIcon />
                </Pressable>
              </View>
              <Text
                style={[styles.textRestaurantNormalInfo, { marginLeft: 50 }]}
              >
                {restaurant.contact}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.restaurantDistanceInfo]}>
          <View style={styles.restaurantDistanceContent}>
            <Text style={[styles.textRestaurantNormalInfo, styles.bold]}>
              {currentOpeningHours.open} - {currentOpeningHours.closed}
            </Text>
            <View style={[styles.row]}>
              <Text style={styles.textRestaurantNormalInfo}>Horario</Text>
              <Text style={styles.textRestaurantNormalInfo}>-</Text>
              <Text
                style={[
                  styles.textRestaurantNormalInfo,
                  {
                    color: restaurantStatus === "Aberto" ? "green" : "red",
                    fontWeight: "bold",
                  },
                ]}
              >
                {restaurant.isOpen ? "Aberto" : "Fechado"}
              </Text>
            </View>
          </View>
          <View style={styles.restaurantDistanceContent}>
            <Text style={[styles.textRestaurantNormalInfo, styles.bold]}>
              1km
            </Text>
            <Text style={styles.textRestaurantNormalInfo}>Distancia</Text>
          </View>
        </View>
        <View style={[styles.row, styles.imageAccessContainer]}>
          <View style={styles.row}>
            <FlatList
              data={characteristics}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingRight: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image style={styles.image} source={{ uri: item.icon }} />
                  <Text style={styles.characteristicName}>{item.name}</Text>
                </View>
              )}
            />
          </View>
        </View>

        <View style={styles.aboutContainer}>
          <Text
            style={[
              styles.textRestaurantNormalInfo,
              { fontWeight: "bold", fontSize: 18 },
            ]}
          >
            Sobre
          </Text>
          <View style={styles.aboutContent}>
            <Text style={styles.textRestaurantNormalInfo}>
              {showMore
                ? restaurant.description
                : restaurant.description.slice(0, 50) + "..."}
            </Text>
            {!showMore && (
              <Pressable
                onPress={() => setShowMore(!showMore)}
                style={{
                  backgroundColor: Colors.colors.neutral02Color.neutral_01,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 5,
                  width: "100%",
                  padding: 10,
                }}
              >
                <Text style={{ color: "white" }}>Ver Mais</Text>
              </Pressable>
            )}
            {showMore && (
              <Pressable
                onPress={() => setShowMore(!showMore)}
                style={{
                  backgroundColor: Colors.colors.neutral02Color.neutral_01,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 5,
                  width: "100%",
                  padding: 10,
                }}
              >
                <Text style={{ color: "white" }}>Ver Menos</Text>
              </Pressable>
            )}
          </View>
        </View>
        <View
          style={{
            marginBottom: 15,
            marginTop: 15,
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "left",
            }}
          >
            Especialidade
          </Text>
        </View>
        <View style={styles.specialityContainer}>
          <StarIcon width={35} height={35} />
          <Text
            style={[
              styles.textRestaurantNormalInfo,
              {
                fontWeight: "normal",
                fontSize: 20,
                textAlign: "center",
              },
            ]}
          >
            {restaurant.especialty}
          </Text>
        </View>
        <View style={styles.platesContainer}>
          <Text
            style={[
              styles.textRestaurantNormalInfo,
              {
                fontWeight: "bold",
                fontSize: 18,
                marginBottom: 10,
                textAlign: "left",
              },
            ]}
          >
            Pratos do Dia
          </Text>

          <View style={{}}>
            {menuItems.length > 0 ? (
              <>
                <FlatList
                  vertical
                  data={menuItems}
                  renderItem={({ item, index }) => (
                    <RenderItem item={item} index={index} />
                  )}
                  showsHorizontalScrollIndicator={false}
                />
                <View>
                  <Pressable
                    style={{
                      backgroundColor: Colors.colors.neutral02Color.neutral_01,
                      borderRadius: 100,
                      marginBottom: 25,
                    }}
                    onPress={() => {
                      navigation.navigate("MenuPlatesPage", {
                        restaurant: restaurant,
                        plates: plates,
                      });
                    }}
                  >
                    <Text
                      style={{
                        color:
                          Device.brand == "Apple"
                            ? Colors.colors.neutral02Color.neutral_10
                            : Colors.colors.neutral02Color.neutral_10,
                        textAlign: "center",
                        padding: 10,
                      }}
                    >
                      Ver Menu Completo
                    </Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <Text>Sem pratos do dia disponivel</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colors.neutral02Color.neutral_10,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 50,
  },
  specialityContainer: {
    alignSelf: "flex-start",
    gap: 10,
    paddingTop: 20,
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  containerRestaurantInfo: {
    flex: 1,
    backgroundColor: Colors.colors.neutral02Color.neutral_10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
  },
  restaurantTitleInfo: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 35,
    borderBottomColor: "grey",
  },
  textRestaurantTitleInfo: { fontSize: 22, fontWeight: "bold" },
  textRestaurantNormalInfo: { fontSize: 16 },
  restaurantDistanceInfo: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 35,
    gap: 30,
  },
  restaurantDistanceContent: { justifyContent: "center", alignItems: "center" },
  image: {
    width: 50,
    height: 50,
  },
  imageRestaurant: {
    width: "100%",
    height: "100%",
  },
  imageAccessContainer: {
    gap: 20,
  },
  aboutContainer: {
    marginTop: 35,
    gap: 10,
  },
  platesContainer: { marginTop: 35, flex: 1 },
  itemName: {
    fontWeight: "bold",
  },
  item: {},
  phoneNumberCall: {
    margin: 10,
  },
  AddressButton: {
    margin: 10,
  },
  aboutContent: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bold: {
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: Colors.colors.neutral02Color.neutral_10,
    position: "absolute",
    height: "60%",
    width: "80%",
    top: 200,
    right: 40,
    borderRadius: 20,
  },
  modalContent: {
    padding: 15,
    paddingLeft: 0,
    paddingRight: 0,
  },
  modalMenuTitle: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 35,
    paddingBottom: 20,
    width: "100%",
  },
  modalContentMenu: {
    width: "100%",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 35,
    paddingBottom: 35,
  },
  modalContentMenuBox: {
    marginBottom: 23,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
