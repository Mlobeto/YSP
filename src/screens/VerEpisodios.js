import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'



export default function VerEpisodios() {
 
  return (
    <View >
        
    <YoutubePlayer
      height={300}
      play={false}
      videoId={'AJA9UELSDAw'}
     />
    </View>
     
  
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
 
})