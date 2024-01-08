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
  Alert,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../FirebaseConfig';
import logo500 from '../../assets/logo500.png';
import fondochat from "../../assets/fondochat.png";

export default function SignIn({ navigation }) {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('LogIn Exitoso');
          navigation.navigate("Home");
        })
        .catch((err) => Alert.alert("No pudiste loguearte", err.message));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={fondochat} resizeMode='cover' style={{ height: 130, width: screenWidth }} />  
        <View style={styles.innerContainer}>
          <Image source={logo500} style={styles.logo} />
          {/* Otras secciones del contenido */}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#000" style={styles.icon} />
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Tu Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#000" style={styles.icon} />
            <TextInput
              value={password}
              style={styles.input}
              placeholder="Tu Contraseña"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              autoCorrect={false}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          <>
            <TouchableOpacity>
              <Text style={[styles.buttonsText, styles.forgotPasswordText]}>
                Recupera tu Contraseña
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onHandleLogin}
              style={styles.signInButton}
            >
              <Text style={styles.signInButtonText}>Ingresa</Text>
            </TouchableOpacity>

            <View>
              <Text style={styles.title3}>No tienes una cuenta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                <Text style={styles.registerText}>Regístrate Aquí</Text>
              </TouchableOpacity>
            </View>
          </>
          
          <Text style={styles.orText}>O ingresa con</Text>

          <View style={styles.buttonContainer}>
            {/* Botones de redes sociales */}
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/2702/2702602.png" }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "white"
  },
  scrollContainer: {
    flexGrow: 1,
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
  contentContainer: {
    paddingHorizontal: 30,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 30,
    marginTop: 0,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  eyeIcon: {
    position: 'absolute',
    top: 15,
    right: 10,
  },
  forgotPasswordText: {
    fontWeight: "bold",
    lineHeight: 30,
    textAlign: "right",
  },
  signInButton: {
    backgroundColor: "#00b4d8",
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
    marginVertical: 70,
    shadowColor: "#00b4d8",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
  },
  signInButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18, 
  },
  title3: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 0,
    color: "#6d6875",
    marginBottom: 20
  ,
  },
  registerText: {
    fontWeight: "bold",
    lineHeight: 35,
    textAlign: "center",
  },
  orText: {
    color: "white",
    textAlign: "center",
    padding: 5,
    marginBottom: -40,
    marginTop: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#DFE3E630",
    marginTop: 0,
  },
  socialButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff70",
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
});
