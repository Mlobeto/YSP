import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";

export default function VerEpisodios({ navigation }) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Función para cargar listas de reproducción
    const loadPlaylists = async () => {
      try {
        setLoading(false);

        // Actualiza tu URL para incluir el token de página
        const response = await fetch(
          `https://back-ysp.onrender.com/listas`
        );
        const data = await response.json();

        // Actualiza el estado según las nuevas listas
        setPlaylists(data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setLoading(false);
      }
    };

    // Llama a la función de carga de listas al montar el componente
    loadPlaylists();
  }, []);

  const handlePlaylistPress = (playlist) => {
    if (playlist) {
      const playlistId = playlist.id;
  
      // Ahora puedes utilizar playlistId según tus necesidades, por ejemplo, para construir la URL
      console.log('Playlist ID:', playlistId);
  
      // Luego, puedes navegar a la pantalla de Reproductor y pasar el objeto playlist o solo el playlistId
      navigation.navigate("VideosListasSeleccionados", { playlistId });
    } else {
      console.error('Lista de reproducción no definida:', playlist);
    }
  };

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePlaylistPress(item)}>
      <View style={styles.playlistContainer}>
        <Image
          source={{ uri: item.snippet.thumbnails.medium.url }}
          style={styles.playlistThumbnail}
        />
        <Text style={styles.playlistTitle}>{item.snippet.title}</Text>
        <Text style={styles.playlistDescription}>
          {item.snippet.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          renderItem={renderPlaylistItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  playlistContainer: {
    margin: 10,
    alignItems: "center",
  },
  playlistThumbnail: {
    width: 320,
    height: 180,
  },
  playlistTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  playlistDescription: {
    textAlign: "center",
  },
});

