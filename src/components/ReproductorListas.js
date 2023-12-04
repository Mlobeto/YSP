import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import YoutubePlayer from "react-native-youtube-iframe";

const ReproductorListas = ({playlistId}) => {
    const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://back-ysp.onrender.com/listas/${playlistId}/videos`);
        console.log(response)
        const data = await response.json();
        setVideos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [playlistId]);

  const marcarComoFavorito = async (videoId) => {
    // Implementa la funcionalidad de marcar como favorito un video
    // Usa videoId para marcar el video correspondiente como favorito
  };

  return (
    <View>
    {loading ? (
      <Text>Cargando Videos</Text>
    ) : (
      <View>
        {videos.map((video, index) => (
          <View key={index}>
            <YoutubePlayer height={300} play={false} videoId={video.id} />
            <TouchableOpacity
              onPress={() => marcarComoFavorito(video.id)}
              style={styles.button2}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Marcar como favorito
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    )}
  </View>
);
};

export default ReproductorListas

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
    menuBar: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderTopColor: "#ccc",
      borderRadius: 10, // Define la cantidad de redondeo que prefieras
      // Para establecer un sombreado alrededor del menú
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    menuItem: {
      backgroundColor: "#3498db",
  padding: 10,
  borderRadius: 15, // Define la cantidad de redondeo que prefieras
  margin: 5,
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
      fontSize: 20,
      fontWeight: "500",
      lineHeight: 20,
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