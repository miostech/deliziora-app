
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { registerRootComponent } from "expo";
import SplashScreen from "./src/view/SplashScreen";
import HomeScreen from "./src/view/HomeScreen";
import Walkthrough from "./src/view/Walkthrough";
import SearchErrorScreen from "./src/view/SearchErrorScreen";
import SearchPostalCodeScreen from "./src/view/SearchPostalCodeScreen";
import NotificationNotFoundScreen from "./src/view/NotificationNotFoundScreen";
import LoadingPageScreen from "./src/view/LoadingPageScreen";
import HomeLoading from "./src/view/HomeLoading";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function StackApp() {
    return (
      <Stack.Navigator
        initialRouteName="HomeScreen"
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
          name="Walkthrough"
          component={Walkthrough}
          screenoptions={{ headerShadowVisible: false, animation: "fade" }}
          options={{
            headerShadowVisible: false,
            headerShown: true,
            headerRight: () => {
              return (
                <TouchableOpacity>
                  <Text style={{ fontSize: 18, fontWeight: 500 }}>Pular</Text>
                </TouchableOpacity>
              );
            },
          }}
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
    <NavigationContainer>
      <StackApp />
    </NavigationContainer>
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
