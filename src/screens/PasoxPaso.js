import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions
} from 'react-native';

import MyBlur from '../components/MyBlur';
import { useNavigation } from '@react-navigation/native';

const PasoxPaso = () => {
  const { height } = Dimensions.get("window");
  const navigation = useNavigation();
  const steps = [
    require('../../assets/Paso1.png'),
    require('../../assets/Paso2.png'),
    require('../../assets/Paso3.png'),
    require('../../assets/Paso4.png'),
    require('../../assets/Paso5.png'),
    require('../../assets/Paso6.png'),
    require('../../assets/Paso7.png'),
  ];
  const handleStepPress = (stepNumber) => {
    navigation.navigate(`Paso${stepNumber}`); // Navega a la página correspondiente
  };

 

  return (
    <>
    <MyBlur />
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Encontrarás aquí actividades y consejos Paso por Paso</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {steps.map((step, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleStepPress(index + 1)}
          >
            <Image source={step} style={styles.buttonImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  </>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    margin: 10,
  },
  headerText: {
    fontSize: 27,
    fontWeight: "700",
    lineHeight: 25,
    textAlign: "center",
    color: "#6d6875",
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent', // Fondo transparente para que la imagen sea visible
    padding: -5,
    margin: -28,
    borderRadius: 5,
  },
  buttonImage: {
    width: 200, // Ajusta el ancho y alto según tus necesidades
    height: 200,
  },
});

export default PasoxPaso;


