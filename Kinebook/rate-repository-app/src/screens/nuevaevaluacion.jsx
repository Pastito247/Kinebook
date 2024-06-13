import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const NuevaEvaluacion = ({ route, navigation }) => {
  const { kinesiologoId } = route.params;
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [escalas, setEscalas] = useState({
    brazoIzquierdo: '',
    brazoDerecho: '',
    piernaIzquierda: '',
    piernaDerecha: '',
  });

  const handleSubmit = () => {
    fetch('http://192.168.0.10:3000/api/evaluaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        kinesiologoId,
        nombrePaciente,
        escalas,
        fecha: new Date(),
      }),
    })
      .then(response => response.json())
      .then(data => {
        navigation.navigate('Lobby', { kinesiologoId });
      })
      .catch(error => console.error('Error al realizar la solicitud:', error));
  };

  return (
    <ImageBackground source={require('../img/background.jpg')} resizeMode='cover' style={{ width, height }}>
      <View style={styles.container}>
        <TextInput
          placeholder="Nombre del Paciente"
          style={styles.input}
          value={nombrePaciente}
          onChangeText={setNombrePaciente}
        />
        <TextInput
          placeholder="Escala Brazo Izquierdo"
          style={styles.input}
          value={escalas.brazoIzquierdo}
          onChangeText={(text) => setEscalas({ ...escalas, brazoIzquierdo: text })}
        />
        <TextInput
          placeholder="Escala Brazo Derecho"
          style={styles.input}
          value={escalas.brazoDerecho}
          onChangeText={(text) => setEscalas({ ...escalas, brazoDerecho: text })}
        />
        <TextInput
          placeholder="Escala Pierna Izquierda"
          style={styles.input}
          value={escalas.piernaIzquierda}
          onChangeText={(text) => setEscalas({ ...escalas, piernaIzquierda: text })}
        />
        <TextInput
          placeholder="Escala Pierna Derecha"
          style={styles.input}
          value={escalas.piernaDerecha}
          onChangeText={(text) => setEscalas({ ...escalas, piernaDerecha: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar Evaluación</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#77CFAF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NuevaEvaluacion;
