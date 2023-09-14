import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  Image,
  View,
  Alert,
  Dimensions,
  ActivityIndicator,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MyBlur from "../components/MyBlur";

import {getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, addDoc } from "firebase/firestore";


const auth = getAuth();
const db = getFirestore()

const Registration = ({ navigation }) => {
  const { height } = Dimensions.get("window");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    gender: "",
    diasEstrategia: "",
  });

  const handleChangeText = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const validateForm = () => {
    const errors={}
    
    
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
    }

   

    const handleRegistration = async () => {
      const { isValid, errors } = validateForm();
      if (!isValid) {
        // Muestra los errores en la interfaz de usuario o como alertas según sea necesario
        for (const key in errors) {
          Alert.alert("Error", errors[key]);
          console.log(errors[key]);
        }
        return;
      }
    
      try {
        // Registrar al usuario en Firebase Auth
        console.log("Registrando usuario en Firebase Auth");
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        console.log("Registro exitoso");
        
        // Agreguemos un console.log para mostrar el UID del usuario
        console.log("UID del usuario autenticado:", userCredential.user.uid);
    
        // Guardar los datos adicionales en Firestore
        console.log("Guardando datos adicionales en Firestore");
        const userId = userCredential.user.uid; // Asegúrate de que el UID sea correcto
        const userDocData = {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          diasEstrategia: formData.diasEstrategia,
          userId: userId,
        };
    
        // Agreguemos un console.log para mostrar los datos antes de guardarlos
        console.log("Datos a guardar en Firestore:", userDocData);
    
        const userDocRef = await addDoc(collection(db, "users"), userDocData);
        console.log("Registro exitoso");
    
        Alert.alert(
          "Registro Exitoso",
          "Por favor, revise su correo electrónico para completar el proceso de registro.",
          [
            {
              text: "Ok",
              onPress: () => {
                // Redirigir al usuario a la pantalla de inicio de sesión
                navigation.navigate("SignIn");
              },
            },
          ]
        );
    
        // Registro exitoso, puedes redirigir al usuario a la pantalla de inicio
      } catch (error) {
        console.error("Error de registro:", error);
        // Manejar errores aquí
      }
    };

  return (
    <>
      <MyBlur />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Registrate</Text>
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
            <Text>Género:</Text>
            <Picker
              selectedValue={formData.gender}
              onValueChange={(itemValue) => handleChangeText("gender", itemValue)}
            >
              <Picker.Item label="Selecciona" value="" />
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
                handleRegistration()
                navigation.navigate("SignIn")
                }}
                style={styles.signInButton}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Ok
                </Text>
              </TouchableOpacity>
            </>
            
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default Registration;

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
  body: {
    padding: 20,
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
