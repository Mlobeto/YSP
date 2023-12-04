import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Registration from "./src/screens/Registration";
import SignIn from "./src/screens/SignIn";
import HomeScreen from "./src/screens/HomeScreen";
import VerEpisodios from "./src/screens/VerEpisodios";
import ListasPrimerosPasos from "./src/screens/ListasPrimerosPasos";
import ListasUltimosPasos from "./src/screens/ListasUltimosPasos";
import ListasEspeciales from "./src/screens/ListasEspeciales";
import Reproductor from "./src/screens/Reproductor";
import VideosListasSeleccionados from "./src/screens/VideosListasSeleccionados";
import Favoritos from "./src/screens/Favoritos";
import SignInChat from "./src/screens/SignInChat";
import AgendaLlamada from "./src/screens/AgendaLlamada";
import Welcome from "./src/screens/Welcome"
import Chat from "./src/screens/Chat"
import { auth } from "./FirebaseConfig";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = createStackNavigator();


const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="Registration" component={Registration} />
    </AuthStack.Navigator>
  );
};



const VideosStack = createStackNavigator();

const VideosStackScreen = () => {
  return (
    <VideosStack.Navigator>
      <VideosStack.Screen name="VerEpisodios" component={VerEpisodios} />
      <VideosStack.Screen
        name="VideosListasSeleccionados"
        component={VideosListasSeleccionados}
      />
      <VideosStack.Screen name="Reproductor" component={Reproductor} />
      <VideosStack.Screen name="Favoritos" component={Favoritos} />
    </VideosStack.Navigator>
  );
};

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Welcome":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Home":
              iconName = focused ? "ios-list" : "ios-list-outline";
              break;
            case "VerEpisodios":
              iconName = focused ? "videocam" : "videocam-outline";
              break;
            case "AgendaLlamada":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "SignInChat":
              iconName = focused ? "chatbubbles" : "chatbubbles-outline";
              break;
            case "VideosListasSeleccionados":
            case "Reproductor":
              iconName = "help-circle"; // Puedes cambiar esto según tus necesidades
              break;
            default:
              iconName = "help-circle";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <Tab.Screen name="Welcome" component={ Welcome } />
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="VerEpisodios" component={VideosStackScreen} />
      <Tab.Screen name="AgendaLlamada" component={AgendaLlamada} />
      <Tab.Screen name="SignInChat" component={SignInChat} />
    </Tab.Navigator>
  );
};




export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
      try {
        setUser(authenticatedUser || null);
        setLoading(false);
      } catch (error) {
        console.error("Error in onAuthStateChanged:", error);
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}
