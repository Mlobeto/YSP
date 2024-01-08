import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Avatar, Text, Input, Button } from 'react-native-elements';
import fondochat from '../../assets/fondochat.png';
import logo500 from '../../assets/logo500.png';
import { updateDoc, doc, where, query, getDocs } from 'firebase/firestore';
import { auth, database, collection } from '../../FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';

const ChatPerfil = ({ navigation }) => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const avatars = ['user'];

  useEffect(() => {
    // Solicitar permisos para acceder a la galería de imágenes
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permisos denegados para acceder a la galería de imágenes');
      }
    })();
  }, []);

  const handleAvatarPress = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled && result.uri) {
        console.log('New Avatar URI:', result.uri);
        setAvatar(result.uri);
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };

  const isUsernameAvailable = async (username) => {
    try {
      const q = query(collection(database, 'users'), where('name', '==', username));
      const querySnapshot = await getDocs(q);
      return querySnapshot.empty;
    } catch (error) {
      console.error('Error al verificar la disponibilidad del nombre de usuario:', error);
      throw error;
    }
  };

  const handleSelectAvatar = (selectedAvatar) => {
    setAvatar(selectedAvatar);
    setModalVisible(false);
  };

  const handleSaveProfile = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const isAvailable = await isUsernameAvailable(name);

        if (!isAvailable) {
          console.error('El nombre de perfil ya está en uso');
          // Puedes mostrar un mensaje de error al usuario
          return;
        }

        const userDocRef = doc(collection(database, 'users'), user.uid);

        // Actualizar el documento del usuario con la nueva información
        await updateDoc(userDocRef, {
          avatar,
          name,
        });

        console.log('Perfil guardado correctamente');
        navigation.navigate('SalasChat');
      }
    } catch (error) {
      console.error('Error al guardar el perfil:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={fondochat}
        resizeMode='cover'
        style={{ height: 130, width: '100%' }}
      />
      <View style={styles.innerContainer}>
        <Image source={logo500} style={styles.logo} />

        {/* Componente de Avatar */}
        <TouchableOpacity onPress={handleAvatarPress}>
          {avatar ? (
            <Avatar
              rounded
              size="xlarge"
              source={{ uri: avatar }}
              containerStyle={styles.avatarContainer}
            />
          ) : (
            <Text style={styles.avatarPlaceholder}>Seleccionar Avatar</Text>
          )}
        </TouchableOpacity>

        {/* Formulario para ingresar el nombre */}
        <Input
          placeholder="Nombre para el chat"
          value={name}
          onChangeText={(text) => setName(text)}
          containerStyle={styles.inputContainer}
        />

        {/* Botón para guardar el perfil */}
        <Button
          title="Guardar Perfil"
          onPress={handleSaveProfile}
          containerStyle={styles.buttonContainer}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              {avatars.map((avatarOption, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelectAvatar(avatarOption)}
                  style={styles.avatarOption}
                >
                  <Avatar
                    rounded
                    size="medium"
                    icon={{ name: avatarOption, type: 'font-awesome' }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Button
              title="Cerrar"
              onPress={() => setModalVisible(false)}
              containerStyle={styles.modalCloseButton}
            />
          </View>
        </Modal>
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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'column',
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: 20,
  },
  avatarContainer: {
    marginTop: 20,
  },
  avatarPlaceholder: {
    fontSize: 18,
    marginTop: 20,
    color: '#00b4d8', // Color de placeholder, puedes ajustar según tus necesidades
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  avatarOption: {
    margin: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    width: '80%',
  },
});

export default ChatPerfil;
