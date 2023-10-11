import React from 'react';
import { View, Text } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const Reproductor = ({ route }) => {
  const { item } = route.params;

  // Verifica que item esté definido
  if (item) {
    console.log('Item:', item);

    return (
      <View>
        <YoutubePlayer
          height={300}
          play={true}
          videoId={item}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>No se ha proporcionado un videoId válido.</Text>
      </View>
    );
  }
};

export default Reproductor;



