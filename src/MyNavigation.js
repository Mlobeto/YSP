import * as React from "react";
import { useEffect, useState } from "react"; // Importa useEffect y useState
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { initializeApp } from 'firebase/app';
import {firebaseConfig} from '../FirebaseConfig'

import Registration from './screens/Registration'
import SignIn from './screens/SignIn'
import HomeScreen from "./screens/HomeScreen";
import Welcome from "./screens/Welcome";


const Stack = createNativeStackNavigator();

export default function MyNavigation() {
  const [user, setUser] = useState(null); // Estado local para el usuario

 
  useEffect(() => {
    const auth = getAuth(); // Obtén la instancia de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Estado de autenticación cambiado:", user);
      setUser(user); // Actualiza el estado local del usuario
    });
    return unsubscribe;
  }, []);
  console.log("Estado local de usuario:", user);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "HomeScreen" : "Welcome"}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}