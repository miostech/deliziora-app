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
import HomeScreen from "./src/view/HomeScreen";
import NotificationSvg from "./src/components/SVGs/NotificationSvg/NotificationSvg";
import HomeSvg from "./src/components/SVGs/HomeSvg/HomeSvg";
import MapScreen from "./src/view/MapScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const colors = require("./src/style/Colors.json");
  function HomeTab() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        options={{ headerShadowVisible: false, headerShown: false }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
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
                }}
              >
                <View>
                  <HomeSvg />
                </View>
                <View>
                  <Text>Inicio</Text>
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
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
                <View
                  style={{
                    bottom: 24,
                    backgroundColor: "white",
                    borderRadius: 100,
                    width: 60,
                    height: 60,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 3,
                    borderColor: focused ? colors.colors.baseColor.base_01 : colors.colors.neutral01Color.neutral_08,
                  }}
                >
                  <HomeSvg />
                </View>
                <View>
                  <Text style={{ bottom: 17 }}>Mapa</Text>
                </View>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          screenoptions={{ headerShadowVisible: false, animation: "fade" }}
          options={{
            tabBarShowLabel: false,
            headerShadowVisible: true,
            headerShown: false,
            headerTitle: "",
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
                  <NotificationSvg />
                </View>
                <View>
                  <Text>Notificações</Text>
                </View>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  function StackApp() {
    return (
      <Stack.Navigator
        initialRouteName="HomeTab"
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
