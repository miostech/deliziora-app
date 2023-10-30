import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { registerRootComponent } from "expo";
import SplashScreen from "./src/view/SplashScreen";
import Walkthrough from "./src/view/Walkthrough";
import Notifications from "./src/view/Notifications";
import ArrowLeft from "./src/components/SVGs/ArrowLeft/ArrowLeft";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function StackApp() {
    return (
      <Stack.Navigator
        initialRouteName="Notifications"
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
          name="Notifications"
          component={Notifications}
          screenoptions={{ headerShadowVisible: false, animation: "fade" }}
          options={{
            headerShadowVisible: true,
            headerShown: true,
            headerTitle:"",
          }}
        />
        <Stack.Screen
          name="Walkthrough"
          component={Walkthrough}
          screenoptions={{ headerShadowVisible: false, animation: "fade" }}
          options={{
            headerShadowVisible: false,
            headerShown: true,
            headerTitle: "",
            headerRight: () => {
              return (
                <TouchableOpacity>
                  <Text style={{ fontSize: 18, fontWeight: 500 }}>Pular</Text>
                </TouchableOpacity>
              );
            },
          }}
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
