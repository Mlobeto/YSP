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
import "firebase/firestore";
import { getAuth} from "firebase/auth"; 
import { useNavigation } from "@react-navigation/native";

import { auth } from "../../FirebaseConfig";



const Welcome = () => {
  const navigation = useNavigation();
  const { height } = Dimensions.get("window");

 
  return (
    <>
      <MyBlur />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={itro}
            style={{
              width: "50%",
              height: height / 10,
              marginTop: 100,
            }}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              ¿Quieres Recuperarte de una Ruptura?
            </Text>

            <Text style={styles.title2}>
              ¿Quieres Comprobar el Interés de tu Ex?
            </Text>

            <Text style={styles.body}>
              Aquí encontrarás una guía para lograrlo!
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={()=> navigation.navigate('SignIn')}
                style={styles.button2}
              >
                <Text style={styles.buttonsText}>Ingresa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Welcome;

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
    marginTop: 50,
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
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 16,
    backgroundColor: "#DFE3E630",
    marginTop: 60,
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
    padding: 16,
  },
  buttonsText: {
    fontWeight: "500",
    color: "#ff6e01",
  },
});
