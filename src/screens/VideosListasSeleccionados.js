import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const VideosListasSeleccionados = ({ route, navigation }) => {
  const { playlistId } = route.params;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://back-ysp.onrender.com/listas/${playlistId}/videos`
        );
        const data = await response.json();

        // Actualizar el estado con los videos obtenidos
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        // Independientemente del resultado, establecer loading en false
        setLoading(false);
      }
    };

    // Llamar a la función de carga de videos al montar el componente
    fetchVideos();
  }, [playlistId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleItemPress = (item) => {
    if (item) {
      const itemId = item.id;
  
      // Ahora puedes utilizar itemId según tus necesidades, por ejemplo, para construir la URL
      console.log('item ID:', item);
  
      // Luego, puedes navegar a la pantalla de Reproductor y pasar el objeto item o solo el itemId
      navigation.navigate("Reproductor", { item: item });
    } else {
      console.error('Video no definido:', item);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.contentDetails.videoId}
          renderItem={({ item }) => {
      
            return (
              <TouchableOpacity
                onPress={() => handleItemPress(item.contentDetails.videoId)}
              >
                <View style={styles.playlistThumbnail}>
                  <Image
                    source={{ uri: item.snippet.thumbnails.medium.url }}
                    style={styles.playlistThumbnail}
                    resizeMode="cover" // O "contain" según tus preferencias
                  />
                  <Text>{item.snippet.title}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};
export default VideosListasSeleccionados;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  playlistContainer: {
    margin: 20,
    alignItems: "center",
  },
  playlistThumbnail: {
    width: 320,
    height: 180,
    borderWidth: 1, // Agrega esta línea
    borderColor: "white", // Puedes cambiar el color del borde si es necesario
    marginTop:40,
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
//   <TouchableOpacity onPress={() => handlePlaylistPress(item)}>
//       <View style={styles.playlistContainer}>
//         <Image
//           source={{ uri: item.snippet.thumbnails.medium.url }}
//           style={styles.playlistThumbnail}
//         />
//         <Text style={styles.playlistTitle}>{item.snippet.title}</Text>
//         <Text style={styles.playlistDescription}>
//           {item.snippet.description}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <FlatList
//           data={playlists}
//           keyExtractor={(item) => item.id}
//           renderItem={renderPlaylistItem}
//         />
//       )}
//     </View>
//   );
// }
