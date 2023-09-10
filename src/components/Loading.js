import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Overlay } from '@rneui/base' 
import MyBlur from './MyBlur'


export default function Loading(isVisible, text) {
  return (
    <>
    <MyBlur>
   <Overlay>
    isVisible={isVisible}
    windowBackGroundColor='rgba(0,0,0,0.5)'
    overlayBackGroundColor= 'Transparent'
    overlayStyle = {styles.overlay}
    <View>
        <ActivityIndicator/>
        {
            text && <Text>{text}</Text>
        }
    </View>
  </Overlay>
  </MyBlur>
  </>
  )
}

const styles = StyleSheet.create({
    overlay:{
        height:100,
        width: 200,
        backgroundColor: '#ffff',
        borderColor: '#DFE3E610',
        borderWidth: 2,
        borderRadius: 10

    }
})

