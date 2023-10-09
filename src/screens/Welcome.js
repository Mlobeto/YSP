import React, { useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
} from "react-native";

import MyBlur from "../components/MyBlur";
import itro from "../../assets/itro.png";

export default function Welcome({navigation}) {
  const { height } = Dimensions.get("window");

  const handleNavigation = (screenName) => {
   
    navigation.navigate(screenName);
  };


  return (
    <>
      <MyBlur />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={itro}
            style={{
              width: "70%",
              height: height / 8,
              marginTop: 50,
            }}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              7 Pasos para Recuperarte de una Ruptura
            </Text>

            <Text style={styles.title2}>
              y Comprobar el verdadero Interés de tu Ex en la Relación
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleNavigation("VerEpisodios")}
                style={styles.button2}
              >
                <Text style={styles.buttonsText}>Ver Videos</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleNavigation("HomeScreen")}
                style={styles.button2}
              >
                <Text style={styles.buttonsText}>Mi Desafío 90 Días</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleNavigation("MasRecursos")}
                style={styles.button2}
              >
                <Text style={styles.buttonsText}>MasRecursos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  contentContainer: {
    paddingHorizontal: 30,
    marginTop: 50,
  },
  body: {
    paddingTop: 40,
    textAlign: "center",
    fontSize: 16,
    color: "#6d6875",
    lineHeight: 30,
    fontWeight: "400",
  },
  title: {
    marginTop: 10,
    fontSize: 27,
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
    color: "#6d6875",
  },
  title2: {
    fontSize: 23,
    fontWeight: "500",
    textAlign: "center",
    color: "#6d6875",
    marginBottom:50,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: "100%",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 16,
    backgroundColor: "#DFE3E630",
    marginTop: 20,
  },
  button1: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff70",
    padding: 16,
    borderRadius: 6,
  },
  button2: {
    flex: 1,
    alignItems: "center",
    padding: 5,
  },
  buttonsText: {
    fontSize: 20,
    color: "#030303",
  },
});
