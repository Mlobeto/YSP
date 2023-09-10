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
  Dimensions,
  ActivityIndicator,
  Button,
} from "react-native";
import MyBlur from "../components/MyBlur";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Loading from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import { firebaseConfig } from "../../FirebaseConfig";

const SignIn = () => {
  const { height } = Dimensions.get("window");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const navigation = useNavigation(); // Obtiene la instancia de navegación

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Si la autenticación es exitosa, redirige al usuario a la pantalla HomeScreen
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
      alert("Algo falló: " + error.message);
      console.error("Error de inicio de sesión:", error);
    } finally {
      setLoading(false);
    }
    // signInWithEmailAndPassword(auth, email, password)
    // .then(()=>{
    //   console.log('Logueado ok')
    //   const user = userCredential.user
    //   console.log(user)
    // })
    // .catch(error=>{
    //   console.log(error)
    // })
  };

  return (
    <>
      <MyBlur />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.contentContainer}>
            <Loading isVisible={true} text="Cargando..." />
            <Text style={styles.title}>Hola nuevamente!</Text>
            <Text style={styles.title2}></Text>

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
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
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
                    handleSignIn();
                  }}
                  style={styles.signInButton}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Ingresar
                  </Text>
                </TouchableOpacity>
              </>
            )}

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
export default SignIn;

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
