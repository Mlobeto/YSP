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
  Image,
 
  Platform
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import fondochat from '../../assets/fondochat.png';
import logo500 from '../../assets/logo500.png';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { auth, database } from "../../FirebaseConfig";
import PhoneInput from "react-native-phone-input";

const Registration = ({ navigation }) => {
  const { height } = Dimensions.get("window");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone:"",
    gender: "",
    diasEstrategia: "",
  });

  const handleChangeText = (fieldName, value) => {
    if (fieldName === "phone") {
      setFormData({ ...formData, phone: value });
    } else {
      setFormData({ ...formData, [fieldName]: value });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (formData.password !== formData.confirmPassword) {
      errors.password = "Las contraseñas no coinciden";
    }
    if (!formData.firstName || formData.firstName.length < 2) {
      errors.firstName = "El nombre debe tener al menos 2 caracteres";
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      errors.lastName = "El apellido debe tener al menos 2 caracteres";
    }

    const diasEstrategia = parseInt(formData.diasEstrategia);
    if (!diasEstrategia || isNaN(diasEstrategia)) {
      errors.diasEstrategia = "Este campo debe ser numérico";
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  };

  const handleRegistration = async () => {
    try {
      const countryCode = this.phoneInput.getCountryCode();
      console.log("Registrando usuario en Firebase Auth");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      console.log("Registro exitoso");
      console.log("UID del usuario autenticado:", userCredential.user.uid);

      console.log("Guardando datos adicionales en Firestore");

      // Utilizar el mismo UID del usuario como ID del documento
      const userDocRef = doc(database, "users", userCredential.user.uid);

      await setDoc(userDocRef, {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        countryCode: countryCode,
        gender: formData.gender,
        diasEstrategia: formData.diasEstrategia,
        userId: userCredential.user.uid,
        videosFavoritos: [],
        isMember: false, 
      });

      console.log("Registro en Firestore exitoso");

    

      Alert.alert(
        "Registro Exitoso",
        "Por favor, revise su correo electrónico para completar el proceso de registro.",
        [
          {
            text: "Ok",
            onPress: () => {
             
              navigation.navigate("SignIn");
            },
          },
        ]
      );
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.log("La dirección de correo electrónico ya está en uso.");
       
      } else {
        console.error("Error de registro:", error);
      }
    }
  };

  return (
    
    <View style={styles.container}>
     <Image source={fondochat} style={styles.background} />
    
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
         
          <View style={styles.innerContainer}>
        {/* Include Logo */}
        <Image source={logo500} style={styles.logo} />

           
            <TextInput
              value={formData.email}
              style={styles.input}
              placeholder="Tu Email"
              autoCapitalize="none"
              onChangeText={(text) => handleChangeText("email", text)}
              autoCorrect={false}
            />
            <TextInput
              value={formData.password}
              style={styles.input}
              placeholder="Tu Contraseña"
              autoCapitalize="none"
              onChangeText={(text) => handleChangeText("password", text)}
              autoCorrect={false}
              secureTextEntry={true}
            />

            <TextInput
              value={formData.confirmPassword}
              style={styles.input}
              placeholder="Repite Tu Contraseña"
              autoCapitalize="none"
              onChangeText={(text) => handleChangeText("confirmPassword", text)}
              autoCorrect={false}
              secureTextEntry={true}
            />

            <TextInput
              value={formData.firstName}
              style={styles.input}
              placeholder="Tu Nombre"
              autoCapitalize="none"
              onChangeText={(text) => handleChangeText("firstName", text)}
              autoCorrect={false}
            />
            <TextInput
              value={formData.lastName}
              style={styles.input}
              placeholder="Tu Apellido"
              autoCapitalize="none"
              onChangeText={(text) => handleChangeText("lastName", text)}
              autoCorrect={false}
            />
            <PhoneInput
              ref={(ref) => (this.phoneInput = ref)}
              initialCountry="us"
              onChangePhoneNumber={(value) => handleChangeText("phone", value)}
              textStyle={{ fontSize: 18 }}
            />
            
            <Picker
              selectedValue={formData.gender}
              onValueChange={(itemValue) =>
                handleChangeText("gender", itemValue)
              }
            >
              <Picker.Item label="Genero" value="" />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Femenino" value="Femenino" />
              <Picker.Item label="Otro" value="Otro" />
            </Picker>
            <TextInput
              value={formData.diasEstrategia}
              style={styles.input}
              placeholder="Días Aplicando la Estrategia"
              onChangeText={(text) => handleChangeText("diasEstrategia", text)}
              keyboardType="numeric"
            />
            <>
              <TouchableOpacity
                onPress={() => {
                  handleRegistration();
                  
                }}
                style={styles.signInButton}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Ok</Text>
              </TouchableOpacity>
            </>
          </View>
        </ScrollView>
      </SafeAreaView>
      </View>

   
  );
};
export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 30,
    marginTop: -68, // Adjust this value as needed to match the desired spacing
  },
  background: {
    height: 130, // Set the height based on your design preferences
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: 0,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 80,
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 6,
    paddingHorizontal: 6,
    paddingBottom: 6,
    flexDirection: 'column',
  },
  input: {
    backgroundColor: '#F7F7F7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: '#00b4d8',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 30,
    shadowColor: '#00b4d8',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
  },
});
