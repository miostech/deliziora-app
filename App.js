import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./src/redux/store";
import HomeAndFavorites from "./src/components/HomeAndFavorites";
import SplashScreen from "./src/view/SplashScreen";
import Walkthrough from "./src/view/Walkthrough";
import Notifications from "./src/view/Notifications";
import HomeScreen from "./src/view/HomeScreen";
import MapSvg from "./src/components/SVGs/MapSvg/MapSvg";
import NotificationSvg from "./src/components/SVGs/NotificationSvg/NotificationSvg";
import ArrowLeft from "./src/components/SVGs/ArrowLeft/ArrowLeft";
import { TouchableOpacity, View, Text, Pressable } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import SearchErrorScreen from "./src/view/SearchErrorScreen";
import SearchPostalCodeScreen from "./src/view/SearchPostalCodeScreen";
import NotificationNotFoundScreen from "./src/view/NotificationNotFoundScreen";
import LoadingPageScreen from "./src/view/LoadingPageScreen";
import HomeLoading from "./src/view/HomeLoading";
import ProfileRestaurantPage from "./src/view/ProfileRestaurantPage";
import MenuPlatesPage from "./src/view/MenuPlatesPage";
import RestaurantList from "./src/view/RestaurantList";
import { OpenAPI } from "deliziora-client-module/client-web";
import Toast from 'react-native-toast-message';
import { Path, Svg } from "react-native-svg";
import HomeSvg from "./src/components/SVGs/HomeSvg/HomeSvg";
import ListType from "./src/components/ListType";
import ModalFavoritesOrNonFavorites from "./src/components/organisms/ModalFavoritesOurNonFavorites/ModalFavoritesOurNonFavorites";
import listTypeSlice, {
  setListType,
} from "./src/redux/features/listTypeSlice/listTypeSlice";
import ModalFavoritesOurNonFavorites from "./src/components/organisms/ModalFavoritesOurNonFavorites/ModalFavoritesOurNonFavorites";
import {
  addOrRemoveFavorits,
  removeFavoritsNew,
} from "./src/redux/features/restaurantsFavorites/restaurantsFavoritesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
OpenAPI.BASE = "https://deliziora-api.azurewebsites.net/";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const colors = require("./src/style/Colors.json");
export default function App() {
  function AppStacks() {
    const dispatch = useDispatch();
    const restaurantData = useSelector(
      (state) => state.currentRestaurantSelected
    );
    const [isFavorite, setIsFavorite] = useState(false);
    const favoriteRestaurants = useSelector(
      (state) => state.restaurantsFavorites
    );
    const storedFavorites = AsyncStorage.getItem(
      "@favoriteRestaurants"
    );



    useEffect(() => {
      const checkIsFavorite = async () => {
        try {
          // Recupera os restaurantes favoritos do AsyncStorage
          const storedFavorites = await AsyncStorage.getItem(
            "@favoriteRestaurants"
          );
          console.log("FAVORITOS", storedFavorites);
          if (storedFavorites) {
            const parsedFavorites = JSON.parse(storedFavorites);
            console.log("", parsedFavorites);
            setIsFavorite(storedFavorites.includes(restaurantData._id.$oid));
          }
        } catch (error) {
          console.error("Erro ao recuperar restaurantes favoritos:", error);
        }
      };
      // Verifica se o restaurante está nos favoritos ao montar o componente
      checkIsFavorite();
      return () => {
        setIsFavorite(false);
      }
    }, [restaurantData]);


    const toggleFavorite = () => {
      try {
        const restaurantId = restaurantData._id.$oid;
        // Verifica se o restaurante é favorito
        const isCurrentlyFavorite = favoriteRestaurants.includes(restaurantId);
        setIsFavorite(!isCurrentlyFavorite); // Atualiza o estado local imediatamente

        // Atualiza a lista de restaurantes favoritos no AsyncStorage
        let updatedFavorites = [...favoriteRestaurants];
        if (isCurrentlyFavorite) {
          updatedFavorites = updatedFavorites.filter(id => id !== restaurantId);
        } else {
          updatedFavorites.push(restaurantId);
        }
        AsyncStorage.setItem("@favoriteRestaurants", JSON.stringify(updatedFavorites));

        // Atualiza o estado global de favoritos
        if (isCurrentlyFavorite) {
          dispatch(removeFavoritsNew({ restaurantId }));
        } else {
          dispatch(addOrRemoveFavorits({ restaurantId }));
        }
      } catch (error) {
        console.error("Error updating favorite restaurants:", error);
      }
    };


    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenptions={{ headerShadowVisible: false, animation: "timing" }}
        >
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            screenoptions={{ headerShadowVisible: false, animation: "fade" }}
            options={{
              headerShadowVisible: false,
              headerShown: false,
              header: false,
            }}
          />
          <Stack.Screen
            name="HomeTab"
            component={HomeTab}
            screenoptions={{ headerShadowVisible: false, animation: "fade" }}
            options={{ headerShadowVisible: false, headerShown: false }}
          />
          <Stack.Screen
            name="Walkthrough"
            component={Walkthrough}
            screenoptions={{ headerShadowVisible: false, animation: "fade" }}
            options={{
              headerShadowVisible: false,
              headerShown: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="RestaurantList"
            component={RestaurantList}
            screenoptions={{ headerShadowVisible: false, animation: "fade" }}
            options={{ headerShadowVisible: false, headerShown: false }}
          />
          <Stack.Screen
            name="SearchErrorScreen"
            component={SearchErrorScreen}
            screenoptions={{ headerShadowVisible: false, animation: "fade" }}
            options={{ headerShadowVisible: false, headerShown: false }}
          />
          <Stack.Screen
            name="SearchPostalCodeScreen"
            component={SearchPostalCodeScreen}
            screenoptions={{ headerShadowVisible: false, animation: "fade" }}
            options={{ headerShadowVisible: false, headerShown: false }}
          />
          <Stack.Screen
            name="NotificationNotFoundScreen"
            component={NotificationNotFoundScreen}
            screenoptions={{ headerShadowVisible: false, animation: "fade" }}
            options={{ headerShadowVisible: false, headerShown: false }}
          />
          <Stack.Screen
            name="LoadingPageScreen"
            component={LoadingPageScreen}
            screenoptions={{ headerShadowVisible: false, animation: "fade" }}
            options={{ headerShadowVisible: false, headerShown: false }}
          />
          <Stack.Screen
            name="HomeLoading"
            component={HomeLoading}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MenuPlatesPage"
            component={MenuPlatesPage}
            screenoptions={{ headerShadowVisible: false, animation: "fade" }}
            options={({ navigation }) => ({
              headerShadowVisible: true,
              headerShown: true,
              headerBackVisible: false,

              headerTitle: () => {
                return (
                  <Text textBreakStrategy="highQuality"
                    style={{
                      color: "var(--Neutral-02-Color-Neutral-02, #29272D)",
                      fontFamily: "roboto",
                      textAlign: "center",
                      fontSize: 14,
                      fontStyle: "normal",
                      fontWeight: "600",
                      maxWidth: "85%"
                      ,
                      height: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    Menu Completo - {restaurantData.name}
                  </Text>
                );
              },
              headerLeft: () => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}
                    style={{
                      justifyContent: "center",
                      marginLeft: 10,
                      marginRight: 15,
                    }}
                  >
                    <ArrowLeft />
                  </TouchableOpacity>
                );
              },
            })}
          />
          <Stack.Screen
            name="ProfileRestaurantPage"
            component={ProfileRestaurantPage}
            screenoptions={{ headerShadowVisible: false, animation: "fade" }}
            options={({ navigation }) => ({
              headerShadowVisible: true,
              headerShown: true,
              headerBackVisible: false,
              headerTitle: () => {
                return (
                  <Text
                    style={{
                      color: "var(--Neutral-02-Color-Neutral-02, #29272D)",
                      fontFamily: "roboto",
                      fontSize: 16,
                      maxWidth: "85%",
                      flexWrap: "wrap",
                      textAlign: "center",
                      fontStyle: "normal",
                      fontWeight: "600",
                    }}
                  >
                    {restaurantData.name}
                  </Text>
                );
              },
              headerLeft: () => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}
                    style={{
                      justifyContent: "center",
                      marginLeft: 10,
                      marginRight: 15,
                      maxWidth: "15%"
                    }}
                  >
                    <ArrowLeft />
                  </TouchableOpacity>
                );
              },
              headerRight: () => {
                return (
                  <Pressable
                    style={{
                      alignSelf: "flex-end",
                      justifySelf: "flex-end",
                    }}
                    onPress={toggleFavorite}
                  >
                    {isFavorite ? (
                      <Svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="#F36527"
                        stroke="#F36527"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <Path
                          d="M12.8197 3.82407L12.3771 4.33703C12.1778 4.56804 11.8199 4.56824 11.6203 4.33745L11.1757 3.82322C9.07663 1.39554 5.67336 1.39554 3.5743 3.82322C1.47523 6.25088 1.47523 10.1869 3.5743 12.6146L11.4697 21.7459C11.7626 22.0847 12.2375 22.0847 12.5304 21.7459L20.4318 12.6129C22.5262 10.1772 22.5298 6.25219 20.4304 3.82407C18.3275 1.39198 14.9226 1.39198 12.8197 3.82407Z"
                          stroke="#F36527"
                          strokeWidth="2"
                        />
                      </Svg>
                    ) : (
                      <Svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <Path
                          d="M12.8197 3.82407L12.3771 4.33703C12.1778 4.56804 11.8199 4.56824 11.6203 4.33745L11.1757 3.82322C9.07663 1.39554 5.67336 1.39554 3.5743 3.82322C1.47523 6.25088 1.47523 10.1869 3.5743 12.6146L11.4697 21.7459C11.7626 22.0847 12.2375 22.0847 12.5304 21.7459L20.4318 12.6129C22.5262 10.1772 22.5298 6.25219 20.4304 3.82407C18.3275 1.39198 14.9226 1.39198 12.8197 3.82407Z"
                          stroke="#201F23"
                          strokeWidth="2"
                        />
                      </Svg>
                    )}
                  </Pressable>)
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  function HomeTab() {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const listType = useSelector((state) => state.listType);



    const toggleMapActive = () => {
      // Verifica se a aba está focada antes de alterar o listType

      dispatch(setListType(!listType)); // Altera o listType para o oposto do valor atual
      console.log("listType: ", listType);



    }
    return (
      <Tab.Navigator
        initialRouteName="Map"
        options={{ headerShadowVisible: false, headerShown: false }}
      >
        <Tab.Screen
          name="Home"
          component={HomeAndFavorites}
          options={{
            tabBarLabel: "Início",
            tabBarShowLabel: true,
            headerShown: false,
            tabBarIcon: HomeSvg,
            tabBarInactiveTintColor: "black", // Cor das abas inativas
            tabBarActiveTintColor: "#f36527", // Cor das abas ativas
          }}
        />
        <Tab.Screen
          name="Map"
          listeners={({ navigation, route }) => ({
            blur: () => {
              dispatch(setListType(false));
              console.log("BEFORE", listType);
            },

            tabPress: () => {
              console.log("rota", navigation.isFocused());
              if (navigation.isFocused()) {
                toggleMapActive();
              }
            }
          })}
          component={listType === true ? ModalFavoritesOurNonFavorites : HomeScreen}

          options={{
            tabBarShowLabel: true,
            headerShown: false,
            tabBarLabel: listType === false ? "Mapa " : "Lista",
            tabBarIcon: listType === false ? MapSvg : ListType,
            tabBarIconStyle: {
              position: "absolute",
              top: -30,
              borderColor: "#f2f2f2",
              borderWidth: 3,
              borderRadius: 30,
              backgroundColor: "white",
              width: 60,
              height: 60,
            },
            tabBarInactiveTintColor: "black",
            tabBarActiveTintColor: "#f36527",
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarShowLabel: true,
            tabBarLabel: "Notificações",
            headerShown: false,
            tabBarIcon: NotificationSvg,
            tabBarInactiveTintColor: "black", // Cor das abas inativas
            tabBarActiveTintColor: "#f36527", // Cor das abas ativas
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <AppStacks />
      <Toast />
    </Provider>
  );
}
