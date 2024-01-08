import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, Linking,  Switch } from 'react-native';
import fondochat from '../../assets/fondochat.png';
import logo500 from '../../assets/logo500.png';
import { getDoc, doc, collection } from 'firebase/firestore';
import { auth, database } from '../../FirebaseConfig';
import { ScrollView } from 'react-native-gesture-handler'; 
import { MaterialIcons } from '@expo/vector-icons';  // Puedes usar un ícono de tu elección


const SignInChat = ({ navigation }) => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const [isMember, setIsMember] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false); 
                
  useEffect(() => {
    const checkMembershipStatus = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(collection(database, 'users'), user.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const isMember = userData.isMember;

            setIsMember(isMember);

            if (isMember) {
              // Lógica adicional si eres miembro
            } else {
              // Lógica adicional si no eres miembro
            }
          } else {
            console.log('No se encontró el documento del usuario');
          }
        }
      } catch (error) {
        console.error('Error al verificar el estado de membresía:', error);
      }
    };

    checkMembershipStatus();
  }, [navigation]);

  const handleManageProfile = () => {
    if (isAccepted) {
      navigation.navigate('ChatPerfil');
    } else {
      // Lógica adicional si el usuario no ha aceptado las normas
    }
  };

  const handleBecomeMember = () => {
    Linking.openURL('https://www.youtube.com/channel/UCDgXHpJkAlDB5sRz6NrEofw/join');
  };

  const handleAcceptance = () => {
    setIsAccepted(!isAccepted);
  };

  return (
    <View style={styles.container}>
      <Image source={fondochat} resizeMode='cover' style={{ height: 130, width: screenWidth }} />
      <View style={styles.innerContainer}>
        <Image source={logo500} style={styles.logo} />

        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.additionalText}>
            {isMember
              ? 
          `¡Bienvenid@!               
                
          Normas del Chat YSP:

            Respeto y Amabilidad:

            Trata a todos los miembros con cortesía 
            y respeto. 
            La diversidad de opiniones es bienvenida, 
            pero asegúrate de expresar 
            tus ideas de manera amable 
            y constructiva.
            
            Enfoque en la Estrategia:

            Este chat está diseñado para discutir y 
            apoyarse mutuamente en la 
            aplicación de la estrategia en 7 pasos. 
            Mantén las conversaciones enfocadas 
            en este tema para aprovechar al
            máximo la experiencia de todos 
            
            
            Confidencialidad:

            Respeta la privacidad de los demás. 
            Evita compartir información personal sin 
            consentimiento 
            y sé consciente de la confidencialidad de 
            las experiencias compartidas.
            
            Cero Tolerancia al Maltrato:

            No toleramos ningún tipo de maltrato, 
            insultos, discriminación o 
            comportamiento irrespetuoso. 
            Si experimentas alguna situación 
            incómoda, 
            Utiliza el botón verde para reportarla.

            Utiliza un Lenguaje Apropiado:

            Evita el uso de lenguaje ofensivo,
             vulgar o inapropiado. 
             Queremos mantener un ambiente 
             respetuoso 
             y positivo para todos`
              : 'Hazte miembro para acceder a contenido exclusivo.'}
          </Text>
           {/* Check para aceptar las normas */}
           <View style={styles.acceptanceContainer}>
              <Switch
                value={isAccepted}
                onValueChange={handleAcceptance}
                thumbColor="#3F51B5"
                trackColor={{ false: 'gray', true: '#3F51B5' }}
              />
              <Text style={styles.acceptanceText}>Acepto las normas del chat</Text>
            </View>
          
        </ScrollView>

        {/* Mostrar solo a los no miembros */}
        {!isMember && (
          <>
            {/* Botón "Hazte miembro" */}
            <TouchableOpacity onPress={handleBecomeMember}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Hazte miembro</Text>
              </View>
            </TouchableOpacity>

            
          </>
        )}

        {/* Botón "Gestiona tu perfil" */}
        {isMember && (
          <TouchableOpacity onPress={handleManageProfile} disabled={!isAccepted}>
            <View style={[styles.button, styles.manageProfileButton, !isAccepted && styles.disabledButton]}>
              <Text style={styles.buttonText}>Gestiona tu perfil</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Botón de WhatsApp */}
        <TouchableOpacity onPress={() => Linking.openURL('https://walink.co/115942')}>
          <View style={styles.whatsappButton}>
            <Text style={styles.whatsappButtonText}>Ir a WhatsApp</Text>
          </View>
        </TouchableOpacity>
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
  logo: {
    height: 100,
    width: 100,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 15,
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
  manageProfileButton: {
    backgroundColor: "#00b4d8",
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  becomeMemberButton: {
    backgroundColor: "#00b4d8",
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  additionalText: {
    fontSize: 16,
    marginVertical: 10,
    color: 'black',
  },
  acceptanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  acceptanceText: {
    marginLeft: 10,
  },
  whatsappButton: {
    backgroundColor: '#25D366', // Color de WhatsApp
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  whatsappButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignInChat;





