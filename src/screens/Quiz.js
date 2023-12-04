import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Picker } from "@react-native-picker/picker";

const Formulario = () => {
  const [respuestas, setRespuestas] = useState({
    paso1: '',
    paso2: '',
    paso3:"",
    paso4:""
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [mensaje, setMensaje] = useState(''); 

  const handlePickerChange = (paso, valor) => {
    setRespuestas((prevRespuestas) => ({ ...prevRespuestas, [paso]: valor }));
  };

  const handleEnviarFormulario = () => {
    // Lógica para evaluar las respuestas y mostrar un mensaje
    let mensaje = '¡Has completado la estrategia!';

    if (respuestas.paso1 === '') {
      mensaje = 'Debes seleccionar una opción para el paso 1.';
    } else if (respuestas.paso2 === '') {
      mensaje = 'Debes seleccionar una opción para el paso 2.';
    }
    // ... más lógica según tus necesidades

    // Muestra el modal con el mensaje
    setModalVisible(true);
  };

  return (
    <View>
      {/* Componentes de Picker para cada paso */}
      <View>
        <Text>Paso 1:</Text>
        <Picker
          selectedValue={respuestas.paso1}
          onValueChange={(valor) => handlePickerChange('paso1', valor)}
        >
          <Picker.Item label="Opción 1" value="opcion1" />
          <Picker.Item label="Opción 2" value="opcion2" />
          {/* ... más opciones según tus necesidades */}
        </Picker>
      </View>

      <View>
        <Text>Paso 2:</Text>
        <Picker
          selectedValue={respuestas.paso2}
          onValueChange={(valor) => handlePickerChange('paso2', valor)}
        >
          <Picker.Item label="Opción A" value="opcionA" />
          <Picker.Item label="Opción B" value="opcionB" />
          {/* ... más opciones según tus necesidades */}
        </Picker>
      </View>

      {/* ... más pasos del formulario */}

      {/* Botón para enviar el formulario */}
      <TouchableOpacity onPress={handleEnviarFormulario}>
        <Text>Enviar Formulario</Text>
      </TouchableOpacity>

      {/* Modal para mostrar el mensaje */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View>
          <Text>{mensaje}</Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Formulario;

