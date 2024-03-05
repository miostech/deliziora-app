import Carousel, { Pagination } from "react-native-snap-carousel";
import { useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WalkthroughSvg3 from "./SVGs/WalkthroughSvg3/WalkthroughSvg3";
import WalkthroughSvg2 from "./SVGs/WalkthroughSvg2/WalkthroughSvg2";
import WalkthroughSvg1 from "./SVGs/WalkthroughSvg1/WalkthroughSvg1";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuid4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AnonymousUserLocationService,
  AnonymousUserService,
} from "deliziora-client-module/client-web";
import * as Device from "expo-device";
import * as Location from "expo-location";
import { updateLocation } from "../redux/features/locationSlice/locationSlice";

export default function WalkthroughSlider() {
  const navigation = useNavigation();
  const colors = require("../style/Colors.json");
  const [isLoading, setIsLoading] = useState(false);
  const [carouselWidth, setCarouselWidth] = useState(
    Dimensions.get("window").width
  );

  //  SE FAZ FAVOR NÃO RETIRAR ISSO

  /* 
  const [userDistance, setUserDistance] = useState([]);

useEffect(() => {
    AnonymousUserLocationService.createNewUserLocation().then((res) => {
      setUserDistance(res.data);
    }).catch((err) => {
      console.error(err)
    })
  
  }, [])
 */

  function getStatusLocation() {
    return new Promise(async (res, rej) => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        res(status);
      } catch (error) {
        rej(error);
      }
    });
  }

  function getCurrentLocationDevice() {
    return new Promise(async (res, rej) => {
      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        res(currentLocation);
      } catch (error) {
        rej(error);
      }
    });
  }

  function createUserDB() {
    return new Promise((resolve, reject) => {
      const id = uuid4();
      resolve(
        AnonymousUserService.addAnonymousUser({
          uuid: id,
          created_at: "",
          device_name: Device.brand,
        })
      );
    });
  }

  function createUserLocationDB(id_user, currentLocation) {
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.geodatasource.com/city?key=YKRGEZIEITLVMDUSF2M6HUPN9DMUFVRB&format=json&lat=${currentLocation.coords.latitude}&lng=${currentLocation.coords.longitude}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok!!!");
          }
          return response.json(); // Resolve with JSON data
        })
        .then((data) => {
          AnonymousUserLocationService.createNewUserLocation({
            id_anonymous_user: id_user,
            district: data.city ? data.city : "",
            county: data.region ? data.region : "",
            parish: "",
            latitude: String(currentLocation.coords.latitude),
            longitude: String(currentLocation.coords.longitude),
            created_at: "",
          })
            .then(() => {
              resolve({
                message: "foi terminado processo",
                location: currentLocation.coords,
                data: data,
              });
            })
            .catch((err) => reject(err));

          // Use AsyncStorage correctly
          AsyncStorage.getItem("@favoriteRestaurants").then((response) => {
            console.warn(response);
            if (response !== null) {
              dispatch(setAllFavoritesRestaurants(JSON.parse(response)));
            }
          });
        })
        .catch((error) => {
          console.error(
            "!!!There was a problem with your fetch operation:",
            error
          );
          reject(error);
        });
    });
  }

  function createUser(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await AsyncStorage.setItem("@userData", id);
      } catch (error) {
        reject(error);
      }
    });
  }

  function creatingAnonymousUser() {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      getStatusLocation()
        .then((status) => {
          if (status === "granted") {
            createUserDB().then((res) => {
              createUser(res.data);
              getCurrentLocationDevice().then((location) => {
                createUserLocationDB(res.data, location).then((res) => {
                  console.log(res);
                  setIsLoading(false);
                  resolve("accepted");
                });
              });
            });
          }else{
            navigation.navigate("HomeTab", { screen: "Map" });
          }
        })
        .catch(() => {
          reject("not accepted location");
        });
    });
  }

  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselRef, setCarouselRef] = useState(null);
  const items = [
    {
      id: 2,
      title: "Consultar restaurantes",
      text: "Toque nos ícones dos restaurantes apresentados no mapa para obter melhores informação sobre o estabelecimento.",
      image: <WalkthroughSvg2 />,
    },
    {
      id: 3,
      title: "Ver Menu",
      text: "Veja os perfis dos restaurantes para visualizar os pratos disponíveis no momento.",
      image: <WalkthroughSvg3 />,
    },
    {
      id: 1,
      title: isLoading ? "Aguarde, carregando..." : "Telabite precisa da tua localização atual",
      text: isLoading ? "" : "De forma a mostrar os resultados mais próximos de ti com exatidão e te mostrar onde está a comida que procuras, precisamos de ter acesso à tua localização exata",
      image: <WalkthroughSvg1 />,
      button: (
        <View>
          <Pressable
            style={{
              backgroundColor: colors.colors.baseColor.base_01,
              borderRadius: 100,
              marginBottom: 25,
              width: "100%",
            }}
            onPress={() => {
              creatingAnonymousUser()
                .then((res) => {
                  if (res === "accepted") {
                    navigation.navigate("HomeTab", { screen: "Map" });
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            <Text
              style={{
                color:
                  Device.brand == "Apple"
                    ? colors.colors.neutral02Color.neutral_02
                    : colors.colors.neutral01Color.neutral_08,
                textAlign: "center",
                padding: 10,
              }}
            >
              Ativar Localização
            </Text>
          </Pressable>
        </View>
      ),
    },
  ];

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        backgroundColor: colors.colors.neutral01Color.neutral_08,
      }}
    >
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignSelf: "flex-end",
          marginRight: 40,
        }}
      ></View>

      <Carousel
        data={items}
        ref={(c) => setCarouselRef(c)}
        sliderWidth={carouselWidth}
        itemWidth={carouselWidth}
        enableMomentum
        onSnapToItem={(index) => setActiveSlide(index)}
        renderItem={({ item }) => {
          return (
            <View key={item.id}>
              <View style={{ display: "flex", alignItems: "center" }}>
                <Text>{item.image}</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  margin: 20,
                  alignContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  {item.text}
                </Text>
                <View style={{ width: "100%" }}>{item.button}</View>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {activeSlide === 0 ? (
          <TouchableOpacity>
            <Text>{"          "}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => carouselRef.snapToPrev()}>
            <Text>Voltar</Text>
          </TouchableOpacity>
        )}
        <View>
          <Pagination
            dotsLength={items.length}
            activeDotIndex={activeSlide}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: colors.colors.baseColor.base_01,
            }}
            inactiveDotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: colors.colors.baseColor.base_03,
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
        {activeSlide === 2 ? (
          <TouchableOpacity
            onPress={() => {
              //navigation.navigate("HomeTab");
              creatingAnonymousUser()
                .then((res) => {
                  if (res === "accepted") {
                    navigation.navigate("HomeTab", { screen: "Map" });
                  }
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            <Text>Finalizar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => carouselRef.snapToNext()}>
            <Text>Próximo</Text>
          </TouchableOpacity>
        )}
      </View>
      
    </View>
  );
}
