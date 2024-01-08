import React from "react";
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
import logo500 from '../../assets/logo500.png';
import fondochat from "../../assets/fondochat.png";

export default function Home({ navigation }) {
  const screenWidth = Math.round(Dimensions.get('window').width);
  console.log("Home component rendered");
  const { height } = Dimensions.get("window");

  const handleNavigation = (screenName) => {
    console.log("Navigating to:", screenName);
    navigation.navigate(screenName);
  };
  

  return (
    <>
      <MyBlur />
      <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={fondochat} resizeMode='cover' style={{ height: 130, width: screenWidth }} />
        <View style={styles.innerContainer}>
          <Image source={logo500} style={styles.logo} />
          {/* Otras secciones del contenido */}
        </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              7 Pasos para Recuperarte de una Ruptura
            </Text>

            <Text style={styles.title2}>
              y Comprobar el verdadero Interés de tu Ex en la Relación
            </Text>

           
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
Home.navigationOptions = {
  headerShown: false,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
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
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 0,
    color: "#6d6875",
    marginBottom: 20
  ,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 80,
    marginTop: -70,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 6,
    paddingHorizontal: 6,
    paddingBottom: 6,
    flexDirection: 'column',
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: 0,
   
  },
  title2: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 0,
    color: "#6d6875",
    marginBottom: 20
  ,
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
