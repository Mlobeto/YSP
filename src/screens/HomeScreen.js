import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import MyBlurDos from "../components/MyBlurDos";
import { AntDesign } from "@expo/vector-icons";
import Animated, {useSharedValue, useAnimatedProps, withTiming} from 'react-native-reanimated'
import Desafio from "../components/desafio";
import { auth, database } from "../../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, doc } from "firebase/firestore";

const HomeScreen = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Dentro del useEffect en HomeScreen
const fetchUserInfo = async () => {
  try {
    // Obtener el UID del usuario actualmente autenticado
    const userId = auth.currentUser.uid;
    console.log("User ID:", userId);

    // Construir la referencia al documento del usuario
    const userRef = doc(database, "users", userId);
    console.log("Document ID:", userRef.id);

    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      // Si el documento del usuario existe, obtener la información y establecerla en el estado
      const userData = userDoc.data();
      setUserInfo(userData);
    } else {
      console.log("El documento del usuario no existe en Firestore.");
    }

  } catch (error) {
    console.error("Error al recuperar la información del usuario:", error);
  }
};

// Llamar a la función para cargar la información del usuario
fetchUserInfo();

  }, []);
  
  

  return (
    <>
      <MyBlurDos />
       <SafeAreaView style={styles.container}>
       <Text style={styles.title}>
          {userInfo ? `Hola Querid@ ${userInfo.firstName}. Llevas ${userInfo.diasEstrategia} días aplicando la estrategia` : "Bienvenid@. Cargando información..."}
        </Text>
     
            <View style={styles.centerContainer}>
          <View style={styles.desafio}>
            <Desafio />
          </View>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.signInButton}>CACHORRIE</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 50,
    textAlign: "center",
    color: "#6d6875",
  },
  button2: {
    alignItems: "center",
    padding: 15,
    marginTop: 20, // Ajusta este valor según sea necesario
  },
  signInButton: {
    backgroundColor: "#00b4d8",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#00b4d8",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
  },
  desafio: {
    marginTop: -40, // Ajusta este valor según sea necesario
    borderRadius: 10,
    alignItems: "center",
  },
});
