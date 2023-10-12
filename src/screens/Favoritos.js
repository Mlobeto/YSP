import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useNavigation } from "@react-navigation/native";
import { auth, database } from "../../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const Favoritos = () => {
  const navigation = useNavigation();
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const obtenerFavoritos = async () => {
      try {
        const usuarioActual = auth.currentUser;

        if (usuarioActual) {
          const usuarioDocRef = doc(database, "users", usuarioActual.uid);
          const usuarioDoc = await getDoc(usuarioDocRef);

          if (usuarioDoc.exists()) {
            const videosFavoritos = usuarioDoc.data().videosFavoritos || [];
            setFavoritos(videosFavoritos);
          }
        }
      } catch (error) {
        console.error("Error al obtener videos favoritos:", error);
      }
    };

    obtenerFavoritos();
  }, []);

  const renderFavoritoItem = ({ item }) => (
    <View>
      <YoutubePlayer height={300} play={true} videoId={item} />
      {/* Puedes mostrar más información sobre el video aquí si es necesario */}
    </View>
  );

  return (
    <View>
      <Text>Mis Videos Favoritos</Text>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item}
        renderItem={renderFavoritoItem}
      />
    </View>
  );
};

export default Favoritos;
