import React, { createContext, useContext, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import Welcome from "./src/screens/Welcome";
import Registration from "./src/screens/Registration";
import SignIn from "./src/screens/SignIn";
import VerEpisodios from "./src/screens/VerEpisodios";
import HomeScreen from './src/screens/HomeScreen'
import MasRecursos from "./src/screens/MasRecursos";
import ListasPrimerosPasos from './src/screens/ListasPrimerosPasos' 
import ListasUltimosPasos from './src/screens/ListasUltimosPasos'
import ListasEspeciales from './src/screens/ListasEspeciales'
import Formulario from "./src/screens/Formulario";
import Reproductor from "./src/screens/Reproductor";
import VideosListasSeleccionados from "./src/screens/VideosListasSeleccionados";
import Favoritos from "./src/screens/Favoritos";


import { auth } from "./FirebaseConfig";



const Stack = createStackNavigator();

const AuthenticatedUserContext = createContext({ user: null, setUser: () => {} });

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Checking user authentication...");

    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      try {
        console.log("onAuthStateChanged triggered");
        setUser(authenticatedUser || null);
      } catch (error) {
        console.error("Error in onAuthStateChanged:", error);
        setUser(null);
      }
    });

    return () => {
      console.log("Unsubscribing from onAuthStateChanged");
      unsubscribe();
    };
  }, []);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function YSPApp() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
}


function AuthStack() {
  return(
  <Stack.Navigator >
     <Stack.Screen name="SignIn" component={SignIn} /> 
     <Stack.Screen name="Welcome" component={Welcome} />
     <Stack.Screen name="Registration" component={Registration} />
     <Stack.Screen name="VerEpisodios" component={VerEpisodios} />
     <Stack.Screen name="HomeScreen" component={HomeScreen} />
     <Stack.Screen name="ListasPrimerosPasos" component={ListasPrimerosPasos} /> 
     <Stack.Screen name="ListasUltimosPasos" component={ListasUltimosPasos} />
     <Stack.Screen name="ListasEspeciales" component={ListasEspeciales} />
     <Stack.Screen name="MasRecursos" component={MasRecursos} />
     <Stack.Screen name="Formulario" component={Formulario}/>
     <Stack.Screen name="Reproductor" component={Reproductor}/>
     <Stack.Screen name="VideosListasSeleccionados" component={VideosListasSeleccionados}/>
     <Stack.Screen name="Favoritos" component={Favoritos}/>
  </Stack.Navigator>
)}

export default function App() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Checking user authentication...");
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      try {
        console.log("onAuthStateChanged triggered");
        setUser(authenticatedUser || null);
        setLoading(false);
      } catch (error) {
        console.error("Error in onAuthStateChanged:", error);
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      console.log("Unsubscribing from onAuthStateChanged");
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
    <AuthenticatedUserProvider>
      <NavigationContainer>
        {user ? <YSPApp /> : <AuthStack />}
      </NavigationContainer>
    </AuthenticatedUserProvider>
  );
}







 

