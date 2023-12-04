import React, { useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

import fondochat from '../../assets/fondochat.png';
import logo500 from '../../assets/logo500.png'

const SignInChat = () => {
  const screenWidth = Math.round(Dimensions.get('window').width);

  return (
    <View style={styles.container}>
      <Image
        source={fondochat}
        resizeMode='cover'
        style={{ height: 130, width: screenWidth }}
      />
      <View style={styles.innerContainer}>
      <Image source={logo500} style={styles.logo} />
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 80,
    marginTop: -68,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 6,
    paddingHorizontal: 6,
    paddingBottom: 6,
    flexDirection: 'column',
  },
  logo:{
    height: 100, // Ajusta la altura según tus necesidades
    width: 100, // Ajusta el ancho según tus necesidades
    marginTop: 20, // Espacio entre la imagen fondochat y el logo

  }
});

export default SignInChat;


