import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Registration from "./src/screens/Registration";
import SignIn from "./src/screens/SignIn";
import VerEpisodios from "./src/screens/VerEpisodios";
import Estrategia from "./src/screens/Estrategia";
import Reproductor from "./src/screens/Reproductor";
import VideosListasSeleccionados from "./src/screens/VideosListasSeleccionados";
import Favoritos from "./src/screens/Favoritos";
import SignInChat from "./src/screens/SignInChat";
import ChatPerfil from "./src/screens/ChatPerfil";
import SalasChat from "./src/screens/SalasChat";
import ArgChat from "./src/screens/chats/ArgChat"
import AgendaLlamada from "./src/screens/AgendaLlamada";
import Home from "./src/screens/Home"

import { auth } from "./FirebaseConfig";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = createStackNavigator();


const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}  />
      <AuthStack.Screen name="Registration" component={Registration} options={{ headerShown: false }}  />
      <AuthStack.Screen name="Home" component={Home}  options={{ headerShown: false }} />
      <AuthStack.Screen name="VerEpisodios" component={VerEpisodios} options={{ headerShown: false }}  />
      <AuthStack.Screen name="SignInChat" component={SignInChat} options={{ headerShown: false }}  />
      
    </AuthStack.Navigator>
  );
};



const VideosStack = createStackNavigator();

const VideosStackScreen = () => {
  return (
    <VideosStack.Navigator>
      <VideosStack.Screen name="VerEpisodios" component={VerEpisodios}options={{ headerShown: false }} />
      <VideosStack.Screen
        name="VideosListasSeleccionados"
        component={VideosListasSeleccionados}
      />
      <VideosStack.Screen name="Reproductor" component={Reproductor} />
      <VideosStack.Screen name="Favoritos" component={Favoritos} />
    </VideosStack.Navigator>
  );
};

const ChatStack = createStackNavigator();

const ChatStackScreen = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="SignInChat" component={SignInChat} options={{ headerShown: false }} />
      <ChatStack.Screen name="ChatPerfil" component={ChatPerfil}options={{ headerShown: false }} />
      <ChatStack.Screen name="SalasChat" component={SalasChat} options={{ headerShown: false }}/>
      <ChatStack.Screen name="ArgChat" component={ArgChat} options={{ headerShown: false }}/>
      {/* Agrega más pantallas según sea necesario */}
    </ChatStack.Navigator>
  );
  }

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Estrategia":
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
      
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Estrategia" component={ Estrategia } />
      <Tab.Screen name="VerEpisodios" component={VideosStackScreen} />
      <Tab.Screen name="AgendaLlamada" component={AgendaLlamada} />
      <Tab.Screen name="Chat" component={ChatStackScreen} />
      

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