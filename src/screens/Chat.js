import React, { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => setMessages((prevMessages) => [...prevMessages, ...newMessages])}
    />
  );
};

export default Chat;
