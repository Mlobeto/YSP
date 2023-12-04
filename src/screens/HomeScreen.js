import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  View,
  Button
} from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { StatusBar } from 'expo-status-bar';
import MyBlurDos from "../components/MyBlurDos";
import { AntDesign } from "@expo/vector-icons";
import Animated, {useSharedValue, useAnimatedProps, withTiming} from 'react-native-reanimated'
import Desafio from "../components/Desafio";
import { auth, database } from "../../FirebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";


export default function HomeScreen ({navigation}){
  const [userInfo, setUserInfo] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false)
  
  
  const handleNavigation = (screenName) => {
    if (!isModalVisible) {
      navigation.navigate(screenName);
    }
  };

const openModal =()=> {
  setModalVisible(true)
}
const closeModal =()=>{
  setModalVisible(false)
}

const resetCount = async () => {
  try {
    // Obtener el UID del usuario actualmente autenticado
    const userId = auth.currentUser.uid;

    // Construir la referencia al documento del usuario
    const userRef = doc(database, "users", userId);

    // Actualizar el documento en Firestore
    await updateDoc(userRef, {
      diasEstrategia: 0, // Puedes cambiar esto según tus necesidades
    });

    // Actualizar el estado local
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      diasEstrategia: 0,
    }));

    // Cerrar el modal después de actualizar la cuenta
    closeModal();
  } catch (error) {
    console.error("Error al reiniciar la cuenta:", error);
  }
};
  useEffect(() => {
const fetchUserInfo = async () => {
  try {
    const userId = auth.currentUser.uid;
    console.log("User ID:", userId);
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
      <StatusBar hidden={true} />
       <SafeAreaView style={styles.container}>
       <Text style={styles.title}>
          {userInfo ? `Hola Querid@ ${userInfo.firstName}. Llevas ${userInfo.diasEstrategia} días aplicando la estrategia` : "Bienvenid@. Cargando información..."}
        </Text>
     
        <View style={styles.centerContainer}>
          <View style={styles.desafio}>
            <Desafio />
          </View>
          <TouchableOpacity style={styles.button2} onPress={openModal}>
            <Text style={styles.signInButton}>CACHORRIE</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.button2}
            onPress={() => handleNavigation("PasoxPaso")}
          >
            <Text style={styles.signInButton}>Repasar la Estrategia</Text>
          </TouchableOpacity>
        </View>  
       
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>¿Estás segur@ de comenzar desde cero?</Text>
              <Button title="Confirmar" onPress={resetCount} />
              <Button title="Cancelar" onPress={closeModal} />
            </View>
            
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};


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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});
