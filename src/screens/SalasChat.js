import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const SalasChat = () => {
  return (
    <View>
      <Text>SalasChat</Text>
    </View>
  )
}
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
export default SalasChat