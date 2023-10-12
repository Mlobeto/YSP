import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useNavigation } from "@react-navigation/native";
import { auth, database } from "../../FirebaseConfig";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const Reproductor = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const marcarComoFavorito = async () => {
    try {
      const usuarioActual = auth.currentUser;
  
      if (usuarioActual) {
        const usuarioDocRef = doc(database, "users", usuarioActual.uid);
        const usuarioDoc = await getDoc(usuarioDocRef);
  
        if (!usuarioDoc.exists()) {
          // Si no existe, crea un nuevo documento para el usuario
          await setDoc(usuarioDocRef, {
            videosFavoritos: [item],
          });
          console.log("Video marcado como favorito.");
        } else {
          // Si el documento ya existe, actualiza el array de videosFavoritos
          const videosFavoritos = usuarioDoc.data().videosFavoritos || [];
  
          if (!videosFavoritos.includes(item)) {
            // Agrega el nuevo video al array de favoritos si aún no está presente
            videosFavoritos.push(item);
  
            // Actualiza la colección de favoritos en Firestore
            await setDoc(usuarioDocRef, {
              ...usuarioDoc.data(),  // Mantén los demás datos del usuario
              videosFavoritos: videosFavoritos,
            });
  
            console.log("Video marcado como favorito.");
          } else {
            console.log("El video ya está marcado como favorito.");
          }
        }
      } else {
        console.log("Usuario no autenticado.");
      }
    } catch (error) {
      console.error("Error al marcar como favorito:", error);
    }
  };
  
  

  if (item) {
    console.log("Item:", item);

    return (
      <View>
        <YoutubePlayer height={300} play={true} videoId={item} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={marcarComoFavorito} style={styles.button2}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Marcar como favorito
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Favoritos")}
            style={styles.button1}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Ver Favoritos
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Cargando Video</Text>
      </View>
    );
  }
};

export default Reproductor;



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
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 16,
    backgroundColor: "#DFE3E630",
    marginTop: 20,
  },
  button1: {
    backgroundColor: "#26B6F8",
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
  button2: {
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

  buttonsText: {
    fontSize: 20,
    color: "#030303",
  },
});
