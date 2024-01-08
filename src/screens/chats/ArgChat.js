import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native-web';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, database } from '../../../FirebaseConfig';

const ArgChat = ({ route }) => {
  const { country } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatRoomRef = database.collection('chatRooms').doc(country);
   
    const unsubscribe = chatRoomRef.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (data && data.messages) {
        setMessages(data.messages);
      }
    });

  return () => {
      unsubscribe();
    };
  }, [country]);

  const onSend = async (newMessages = []) => {
    const chatRoomRef = database.collection('chatRooms').doc(country);
    await chatRoomRef.update({
      messages: [...messages, ...newMessages],
    });
  };

  return <GiftedChat messages={messages} onSend={onSend} />;
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
export default ArgChat;
