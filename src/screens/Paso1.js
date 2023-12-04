import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MyBlur from "../components/MyBlur";
import ReproductorListas from "../components/ReproductorListas";

const Paso1 = () => {
  const playlistId = PLv-GlVUgyRrIOpmn3Jj2wMooC7unxJfA2
  
  
  return (
    
    <>

    <SafeAreaView style={styles.container}>
    
  <ScrollView contentContainerStyle={styles.container}>
  <ReproductorListas playlistId={playlistId} />
    <View>
      <Text style={styles.title}>¿Por qué el Contacto Cero es la base fundamental de la estrategia?
Necesitas salir de ese torbellino de emociones que sientes en el momento de la ruptura
Parar la 🏐 
y darte la oportunidad de observar la situación 
Si, el Contacto Cero es una   OPORTUNIDAD
No te alejará de tu ex, olvidate de eso
Utiliza el Contacto Cero para rearmarte

</Text> 

    </View>

        <View style={styles.menuBar}>
          
        </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Paso1

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      backgroundColor: "transparent",
      justifyContent: "center",
    },
    contentContainer: {
      paddingHorizontal: 30,
      marginTop: 50,
    },
    menuBar: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderTopColor: "#ccc",
      borderRadius: 10, // Define la cantidad de redondeo que prefieras
      // Para establecer un sombreado alrededor del menú
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    menuItem: {
      backgroundColor: "#3498db",
  padding: 10,
  borderRadius: 15, // Define la cantidad de redondeo que prefieras
  margin: 5,
},
    body: {
      padding: 20,
      textAlign: "center",
      fontSize: 16,
      color: "#6d6875",
      lineHeight: 30,
      fontWeight: "400",
    },
    title: {
      marginTop: 5,
      fontSize: 15,
      lineHeight: 15,
      textAlign: "center",
      color: "#6d6875",
    },
    title2: {
      fontSize: 23,
      fontWeight: "500",
      textAlign: "center",
      color: "#6d6875",
    },
    buttonContainer: {
      flexDirection: "row",
      width: "100%",
  
      backgroundColor: "#DFE3E630",
      marginTop: 60,
    },
    button1: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#ffffff70",
      padding: 16,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: "white",
      borderRadius: 16,
      marginHorizontal: 10,
    },
    button2: {
      flex: 1,
      alignItems: "center",
      padding: 16,
    },
    buttonsText: {
      fontWeight: "500",
      color: "#ff6e01",
    },
    input: {
      backgroundColor: "#F7F7F7",
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    signInButton: {
      backgroundColor: "#00b4d8",
      padding: 20,
      borderRadius: 12,
      alignItems: "center",
      marginVertical: 30,
      shadowColor: "#00b4d8",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
    },
  });