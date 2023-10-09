import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  ActivityIndicator,
  Button,
} from "react-native";
import {Alert} from 'react-native'
import MyBlur from "../components/MyBlur";
import { signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '../../FirebaseConfig'



export default function SignIn({navigation}){
  
  const { height } = Dimensions.get("window");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //[isUserLoggedIn, setIsUserLoggedIn] = useState(false)


  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('LogIn Exitoso');
          navigation.navigate('Welcome');
        })
        .catch((err) => Alert.alert("No pudiste loguearte", err.message));
    }
  };

  return (
    <>
      <MyBlur />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.contentContainer}>
          
            
            <Text style={styles.title}>Hola nuevamente!</Text>
            

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
            {/* {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : ( */}
              <>
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.buttonsText,
                      {
                        fontWeight: "bold",
                        lineHeight: 30,
                        textAlign: "right",
                      },
                    ]}
                  >
                    Recupera tu Contraseña
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    onHandleLogin();
                  }}
                  style={styles.signInButton}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Ingresar
                  </Text>
                </TouchableOpacity>
                <View>
                 <Text style={styles.title3}>No tienes una cuenta? </Text>
                 <TouchableOpacity onPress={()=> navigation.navigate('Registration')} >
                 <Text
                    style={[
                      styles.buttonsText,
                      {
                        fontWeight: "bold",
                        lineHeight: 30,
                        textAlign: "center",
                      },
                    ]}
                  >
                     Regístrate Aquí </Text>
                  </TouchableOpacity>
                </View>
              </>
            {/* )} */}

            <Text
              style={{
                color: "white",
                textAlign: "center",
                padding: 5,
                marginBottom: -40,
                marginTop: 0,
              }}
            >
              {" "}
              O ingresa con{" "}
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button1}>
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/2702/2702602.png",
                  }}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button1}>
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png",
                  }}
                  style={{ width: 42, height: 42 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};


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
  title3: {
    fontSize: 18,
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
