import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import Animated, { useSharedValue, useAnimatedProps, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { auth, database } from "../../FirebaseConfig";

const Desafio = ({ radius = 100, strokeWidth = 30 }) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;
  const color = "#fc7703";
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const fill = useSharedValue(0);
  const [diasEstrategia, setDiasEstrategia] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Inicializar como false

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const database = getFirestore();
      setIsLoading(true);
  
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(database, "users", user.uid);
          const docSnapshot = await getDoc(userDocRef);
  
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setDiasEstrategia(data.diasEstrategia);
  
            // Agregar console.log para verificar el valor de diasEstrategia
            console.log("Días de estrategia:", data.diasEstrategia);
  
            // Calcula el progreso en función de díasestrategia
            const nuevoProgreso = data.diasEstrategia / 90;
            fill.value = nuevoProgreso;
          } else {
            console.warn("El documento del usuario no existe en Firestore.");
          }
        } else {
          console.warn("Usuario no autenticado.");
        }
      } catch (error) {
        console.error("Error al obtener datos de Firestore:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  

  const handleCompletarDesafio = async () => {
    // Aumenta el valor de díasestrategia en 1 (o la cantidad que desees)
    const nuevoValorDias = diasEstrategia + 1;

    // Obtén el usuario actual (asume que está autenticado)
    
    const user = auth.currentUser;

    if (!user) {
      console.warn("Usuario no autenticado.");
      return;
    }

    // Actualiza el valor de díasestrategia en Firestore
    const userDocRef = doc(database, "users", user.uid);
    try {
      await updateDoc(userDocRef, {
        diasestrategia: nuevoValorDias,
      });
      // Actualiza el estado local con el nuevo valor
      setDiasEstrategia(nuevoValorDias);
    } catch (error) {
      console.error("Error al actualizar datos de Firestore:", error);
    }
  };

  const progress = useSharedValue(diasEstrategia / 90); // Calcula el progreso en función de díasestrategia

  const animatedProps = useAnimatedProps(() => {
    console.log('Animated Props Updated:', fill.value);
    return {
      strokeDasharray: withTiming([circumference * fill.value, circumference]),
    };
  });


return (
    <View style={{width: radius * 2, height: radius * 2}}>
      <Svg style={{flex: 1}}>
        {/* Background */}
        <Circle 
          r={innerRadius}
          cx={radius}
          cy={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          opacity={0.4}
        />
        {/* Foreground */}
        <AnimatedCircle
  cx={radius}
  cy={radius}
  r={innerRadius}
  fill="transparent"
  stroke={color}
  strokeDasharray={[circumference * progress, circumference]}
  strokeWidth={strokeWidth}
  rotation="-90"
  strokeLinecap="round"
  animatedProps={animatedProps} // Asegúrate de pasar las animatedProps aquí
  originX={radius}
  originY={radius}
/>

      </Svg>
      <AntDesign
        name="arrowright"
        size={strokeWidth * 0.7}
        color="black"
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: strokeWidth * 0.1,
        }}
      />
      
    </View>
  )
}

export default Desafio;

const styles = StyleSheet.create({
button2: {
  alignItems: "center",
  padding: 15,
  marginTop: 20, // Ajusta este valor según sea necesario
},
});