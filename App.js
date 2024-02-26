import React, { useState } from "react";
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
import { Path, Svg } from "react-native-svg";
import HomeSvg from "./src/components/SVGs/HomeSvg/HomeSvg";
import ListType from "./src/components/ListType";
import ModalFavoritesOrNonFavorites from "./src/components/organisms/ModalFavoritesOurNonFavorites/ModalFavoritesOurNonFavorites";
import listTypeSlice, {
  setListType,
} from "./src/redux/features/listTypeSlice/listTypeSlice";
import ModalFavoritesOurNonFavorites from "./src/components/organisms/ModalFavoritesOurNonFavorites/ModalFavoritesOurNonFavorites";

OpenAPI.BASE = "https://deliziora-api.azurewebsites.net/";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const colors = require("./src/style/Colors.json");
export default function App() {
  function AppStacks() {
    const restaurantData = useSelector(
      (state) => state.currentRestaurantSelected
    );

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
                  <Text
                    style={{
                      color: "var(--Neutral-02-Color-Neutral-02, #29272D)",
                      fontFamily: "roboto",
                      textAlign: "center",
                      fontSize: 20,
                      fontStyle: "normal",
                      fontWeight: "600",
                      maxWidth: "75%",
                      height: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    {" "}
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
                      fontSize: 20,
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
                    }}
                  >
                    <ArrowLeft />
                  </TouchableOpacity>
                );
              },
              headerRight: () => {
                return
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
    </Provider>
  );
}
