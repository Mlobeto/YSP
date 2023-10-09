// import React, { useEffect, useState, createContext, useContext } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { View, ActivityIndicator } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { onAuthStateChanged } from "firebase/auth";

// import Welcome from "./screens/Welcome";
// import Registration from "./screens/Registration";
// import SignIn from "./screens/SignIn";
// import HomeScreen from "./screens/HomeScreen";
// import VerEpisodios from "./screens/VerEpisodios";
// import Desafio from "./components/Desafio";
// import { auth } from '../FirebaseConfig'

// const Stack = createStackNavigator();
// const AuthenticatedUserContext = createContext({});

// const AuthenticatedUserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   return (
//     <AuthenticatedUserContext.Provider value={{user, setUser}}>
//       {children}
//     </AuthenticatedUserContext.Provider>
//   );
// };

// function YSPApp() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="HomeScreen" component={HomeScreen} />
//     </Stack.Navigator>
//   );
// }
// function AuthStack() {
//   return(
//   <Stack.Navigator defaultScreenOptions={Welcome}>
//      <Stack.Screen name="SignIn" component={SignIn} />
//      <Stack.Screen name="Welcome" component={Welcome} />
//      <Stack.Screen name="Registration" component={Registration} />
//      <Stack.Screen name="Ver Episodios" component={VerEpisodios} />
//      <Stack.Screen name="Desafio" component={Desafio} />
//   </Stack.Navigator>
// )}

// function MyNavigation () {
//   const { user, setUser } = useContext(AuthenticatedUserContext);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth,
//       async authenticatedUser => {
//       authenticatedUser ? setUser(authenticatedUser) : setUser(null);
//       setLoading(false);
//     } 
//     );

//   return () => unsubscribe();
//   }, [user]);

//   if(loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size='large' />
//       </View>
//     )
//   }

//   return (
//     <AuthenticatedUserProvider>
//       <NavigationContainer>
//         {user ? <YSPApp /> : <AuthStack />}
//       </NavigationContainer>
//     </AuthenticatedUserProvider>
//   );
// }

// export default MyNavigation