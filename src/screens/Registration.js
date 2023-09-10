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

import {getAuth,createUserWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../FirebaseConfig'

const Registration = ({ navigation }) => {
  const { height } = Dimensions.get("window");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [diasEstrategia, setDiasEstrategia] = useState("");

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  const handleRegistration = async () => {
    console.log("Comenzando registro de usuario");
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      console.log("Las contraseñas no coinciden");
      return;
    }
    try {
      // Registrar al usuario en Firebase Auth
      console.log("Registrando usuario en Firebase Auth");
      const userCredential= await createUserWithEmailAndPassword(auth, email, password) 
      const user= userCredential.user
      console.log(user)
      // Obtener el ID de usuario
      

      // Guardar campos adicionales en Firestore
  
      

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
    // // createUserWithEmailAndPassword(auth, email, password)
    // // .then(()=>{
    // //   console.log('Cuenta creada')
    // //   const user = userCredential.user
    // //   console.log(user)
    // })
    // .catch(error =>{
    //   console.log(error)
    // })
  };

  return (
    <>
      <MyBlur />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Registrate</Text>
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Tu Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              autoCorrect={false}
            />
            <TextInput
              value={password}
              style={styles.input}
              placeholder="Tu Contraseña"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              autoCorrect={false}
              secureTextEntry={true}
            />

<TextInput
              value={confirmPassword}
              style={styles.input}
              placeholder="Repite Tu Contraseña"
              autoCapitalize="none"
              onChangeText={(text) => setConfirmPassword(text)}
              autoCorrect={false}
              secureTextEntry={true}
            />

            <TextInput
              value={firstName}
              style={styles.input}
              placeholder="Tu Nombre"
              autoCapitalize="none"
              onChangeText={(text) => setFirstName(text)}
              autoCorrect={false}
            />
            <TextInput
              value={lastName}
              style={styles.input}
              placeholder="Tu Apellido"
              autoCapitalize="none"
              onChangeText={(text) => setLastName(text)}
              autoCorrect={false}
            />
            <Text>Género:</Text>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Picker.Item label="Selecciona" value="" />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Femenino" value="Femenino" />
              <Picker.Item label="Otro" value="Otro" />
            </Picker>
            <TextInput
              value={diasEstrategia}
              style={styles.input}
              placeholder="Días Aplicando la Estrategia"
              onChangeText={(text) => setDiasEstrategia(text)}
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
