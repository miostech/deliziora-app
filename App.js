import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { registerRootComponent } from "expo";
import SplashScreen from "./src/view/SplashScreen";
import Walkthrough from "./src/view/Walkthrough";
import Notifications from "./src/view/Notifications";
import ArrowLeft from "./src/components/SVGs/ArrowLeft/ArrowLeft";
import HomeScreen from "./src/view/HomeScreen";
import NotificationSvg from "./src/components/SVGs/NotificationSvg/NotificationSvg";
import HomeSvg from "./src/components/SVGs/HomeSvg/HomeSvg";
import MapSvg from "./src/components/SVGs/MapSvg/MapSvg";
import SearchErrorScreen from "./src/view/SearchErrorScreen";
import SearchPostalCodeScreen from "./src/view/SearchPostalCodeScreen";
import NotificationNotFoundScreen from "./src/view/NotificationNotFoundScreen";
import LoadingPageScreen from "./src/view/LoadingPageScreen";
import HomeLoading from "./src/view/HomeLoading";
import ProfileRestaurantPage from "./src/view/ProfileRestaurantPage";
import { CarouselMapProvider } from "./src/components/CarouselMapContext";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import MenuPlatesPage from "./src/view/MenuPlatesPage";
import RestaurantList from "./src/view/RestaurantList";
import CarouselMapContext from "./src/components/CarouselMapContext";
import { Button } from "@rneui/base";
import { PureNativeButton } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const colors = require("./src/style/Colors.json");

  let [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  function HomeTab() {
    const { listType, setListType, changeList } = useContext(CarouselMapContext);
    return (
      <CarouselMapProvider>
        <Tab.Navigator
          initialRouteName="Map"
          options={{ headerShadowVisible: false, headerShown: false }}
        >
          <Tab.Screen
            name="Home"
            component={RestaurantList}
            options={{
              headerShadowVisible: false,
              tabBarShowLabel: false,
              headerShown: false,
              title: "Inicio",
              tabBarIcon: ({ focused, color, size }) => (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={{}}>
                    <HomeSvg focused={focused} />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: focused
                          ? colors.colors.baseColor.base_01
                          : "black",
                      }}
                    >
                      Inicio
                    </Text>
                  </View>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Map"
            component={() => <HomeScreen listType={listType} />}
            options={({ navigation }) => ({
              headerShadowVisible: false,
              tabBarShowLabel: false,
              headerShown: false,
              title: "",
              tabBarIcon: ({ focused, color, size }) => (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Pressable
                    style={{
                      bottom: 24,
                      backgroundColor: "white",
                      borderRadius: 100,
                      width: 60,
                      height: 60,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 3,
                      borderColor: "#f1f3f4",
                    }}
                    onPress={() => {
                      changeList();
                      console.log("isfocused ", focused)
                    }}
                  >
                    <MapSvg focused={focused} />
                  </Pressable>
                  <View>
                    <Text
                      style={{
                        bottom: 17,
                        color: focused
                          ? colors.colors.baseColor.base_01
                          : "black",
                      }}
                    >
                      Mapa
                    </Text>
                  </View>
                </View>
              ),
            })}
          />
          <Tab.Screen
            name="Notifications"
            component={Notifications}
            screenoptions={{ headerShadowVisible: false, animation: "fade" }}
            options={({ navigation }) => ({
              headerShadowVisible: true,
              tabBarShowLabel: false,
              headerTitle: "Quadro de notificações",
              tabBarIcon: ({ focused, color, size }) => (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <NotificationSvg focused={focused} />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: focused
                          ? colors.colors.baseColor.base_01
                          : "black",
                      }}
                    >
                      Notificações
                    </Text>
                  </View>
                </View>
              ),
              headerLeft: () => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}
                    style={{
                      height: "100%",
                      width: "100%",
                      justifyContent: "center",
                      marginLeft: 10,
                    }}
                  >
                    <ArrowLeft />
                  </TouchableOpacity>
                );
              },
            })}
          />
        </Tab.Navigator>
      </CarouselMapProvider>

    );
  }

  function StackApp() {
    return (
      <Stack.Navigator
        initialRouteName="Splash"
        screenptions={{
          headerShadowVisible: false,
          animation: "timing",
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          screenoptions={{ headerShadowVisible: false, animation: "fade" }}
          options={{ headerShadowVisible: false, headerShown: false }}
        />
        <Stack.Screen
          name="HomeTab"
          component={HomeTab}
          screenoptions={{ headerShadowVisible: false, animation: "fade" }}
          options={{ headerShadowVisible: false, headerShown: false }}
        />
        <Stack.Screen
          name="RestaurantList"
          component={RestaurantList}
          screenoptions={{ headerShadowVisible: false, animation: "fade" }}
          options={{ headerShadowVisible: false, headerShown: false }}
        />

        <Stack.Screen
          name="Walkthrough"
          component={Walkthrough}
          screenoptions={{ headerShadowVisible: false, animation: "fade" }}
          options={({ navigation }) => ({
            headerShadowVisible: false,
            headerShown: true,
            headerTitle: "",
          })}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          screenoptions={{ headerShadowVisible: false, animation: "fade" }}
          options={{ headerShadowVisible: false, headerShown: false }}
        />
        <Stack.Screen
          name="HomeLoading"
          component={HomeLoading}
          options={{ headerShown: false }}
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
          name="MenuPlatesPage"
          component={MenuPlatesPage}
          screenoptions={{ headerShadowVisible: false, animation: "fade" }}
          options={({ navigation }) => ({
            headerShadowVisible: false,
            headerShown: true,
            headerTitle: "Menu",
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
            headerShadowVisible: false,
            headerShown: true,
            headerTitle: "",
            headerLeft: () => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("HomeTab");
                  }}
                  style={{ flexDirection: "row", gap: 80 }}
                >
                  <ArrowLeft />
                  <Text style={{ fontSize: 18, fontWeight: 500 }}>
                    Perfil do Restaurante
                  </Text>
                </TouchableOpacity>
              );
            },
          })}
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
      </Stack.Navigator>
    );
  }

  return (
    <CarouselMapProvider>
      <NavigationContainer>
        <StackApp />
      </NavigationContainer>
    </CarouselMapProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});

registerRootComponent(App);
