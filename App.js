import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from 'react-redux';
import store from './src/redux/store';
import HomeAndFavorites from "./src/components/HomeAndFavorites";
import SplashScreen from "./src/view/SplashScreen";
import Walkthrough from "./src/view/Walkthrough";
import Notifications from "./src/view/Notifications";
import HomeScreen from "./src/view/HomeScreen";
import MapSvg from "./src/components/SVGs/MapSvg/MapSvg";
import NotificationSvg from "./src/components/SVGs/NotificationSvg/NotificationSvg";
import ArrowLeft from "./src/components/SVGs/ArrowLeft/ArrowLeft";
import { TouchableOpacity, View, Text, Pressable } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import SearchErrorScreen from "./src/view/SearchErrorScreen";
import SearchPostalCodeScreen from "./src/view/SearchPostalCodeScreen";
import NotificationNotFoundScreen from "./src/view/NotificationNotFoundScreen";
import LoadingPageScreen from "./src/view/LoadingPageScreen";
import HomeLoading from "./src/view/HomeLoading";
import ProfileRestaurantPage from "./src/view/ProfileRestaurantPage";
import MenuPlatesPage from "./src/view/MenuPlatesPage";
import RestaurantList from "./src/view/RestaurantList";
import { OpenAPI } from "deliziora-client-module/client-web";
OpenAPI.BASE = "https://deliziora-api.azurewebsites.net/";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const colors = require('./src/style/Colors.json')
export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenptions={{ headerShadowVisible: false, animation: "timing" }}>
          <Stack.Screen name="Splash" component={SplashScreen} screenoptions={{ headerShadowVisible: false, animation: "fade" }} options={{ headerShadowVisible: false, headerShown: false }} />
          <Stack.Screen name="HomeTab" component={HomeTab} screenoptions={{ headerShadowVisible: false, animation: "fade" }} options={{ headerShadowVisible: false, headerShown: false }} />
          <Stack.Screen name="Walkthrough" component={Walkthrough} screenoptions={{ headerShadowVisible: false, animation: "fade" }} options={{ headerShadowVisible: false, headerShown: true, headerTitle: "" }} />
          <Stack.Screen name="RestaurantList" component={RestaurantList} screenoptions={{ headerShadowVisible: false, animation: "fade" }} options={{ headerShadowVisible: false, headerShown: false }} />
          <Stack.Screen name="SearchErrorScreen" component={SearchErrorScreen} screenoptions={{ headerShadowVisible: false, animation: "fade" }} options={{ headerShadowVisible: false, headerShown: false }} />
          <Stack.Screen name="SearchPostalCodeScreen" component={SearchPostalCodeScreen} screenoptions={{ headerShadowVisible: false, animation: "fade" }} options={{ headerShadowVisible: false, headerShown: false }} />
          <Stack.Screen name="NotificationNotFoundScreen" component={NotificationNotFoundScreen} screenoptions={{ headerShadowVisible: false, animation: "fade" }} options={{ headerShadowVisible: false, headerShown: false }} />
          <Stack.Screen name="LoadingPageScreen" component={LoadingPageScreen} screenoptions={{ headerShadowVisible: false, animation: "fade" }} options={{ headerShadowVisible: false, headerShown: false }} />
          <Stack.Screen name="HomeLoading" component={HomeLoading} options={{ headerShown: false }} />
          <Stack.Screen name="MenuPlatesPage" component={MenuPlatesPage} screenoptions={{ headerShadowVisible: false, animation: "fade" }} options={({ navigation }) => ({ headerShadowVisible: false, headerShown: true, headerTitle: "Menu", headerLeft: () => { return (<TouchableOpacity onPress={() => { navigation.goBack(); }} style={{ justifyContent: "center", marginLeft: 10, marginRight: 15, }}><ArrowLeft /></TouchableOpacity>); }, })} />
          <Stack.Screen name="ProfileRestaurantPage" component={ProfileRestaurantPage} screenoptions={{ headerShadowVisible: false, animation: "fade" }} options={({ navigation }) => ({ headerShadowVisible: false, headerShown: true, headerTitle: "", headerLeft: () => { return (<TouchableOpacity onPress={() => { navigation.navigate("HomeTab"); }} style={{ flexDirection: "row", gap: 80 }}></TouchableOpacity>); }, })} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function HomeTab({ listType }) {
  const isFocused = useIsFocused();

  return (
    <Tab.Navigator initialRouteName="Map" options={{ headerShadowVisible: false, headerShown: false }}>
      <Tab.Screen name="Home" component={HomeAndFavorites} options={{ tabBarShowLabel: false }} />
      <Tab.Screen name="Map" component={HomeScreen} options={{ tabBarShowLabel: false }} />
      <Tab.Screen name="Notifications" component={Notifications} options={{ tabBarShowLabel: false }} />
      </Tab.Navigator>
      );
}

