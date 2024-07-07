import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const background = require('../img/BackgroundLobby.jpeg');

const EditarPaciente = ({ route, navigation }) => {
  const { paciente } = route.params;

  if (!paciente) {
    return (
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.noDataText}>No hay datos del paciente para editar.</Text>
        </View>
      </ImageBackground>
    );
  }

  const [nombre, setNombre] = useState(paciente.nombre);
  const [apellidoPaterno, setApellidoPaterno] = useState(paciente.apellidoPaterno);
  const [apellidoMaterno, setApellidoMaterno] = useState(paciente.apellidoMaterno);
  const [fechaNacimiento, setFechaNacimiento] = useState(paciente.fechaNacimiento);
  const [diagnostico, setDiagnostico] = useState(paciente.diagnostico);

  const handleSave = () => {
    const updatedData = { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, diagnostico };

    fetch(`http://192.168.0.6:3000/api/pacientes/${paciente._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Paciente actualizado:', data);
        navigation.goBack();
      })
      .catch(error => console.error('Error al actualizar el paciente:', error));
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.text}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />
          <Text style={styles.text}>Apellido Paterno</Text>
          <TextInput
            style={styles.input}
            value={apellidoPaterno}
            onChangeText={setApellidoPaterno}
          />
          <Text style={styles.text}>Apellido Materno</Text>
          <TextInput
            style={styles.input}
            value={apellidoMaterno}
            onChangeText={setApellidoMaterno}
          />
          <Text style={styles.text}>Diagnóstico</Text>
          <TextInput
            style={styles.input}
            value={diagnostico}
            onChangeText={setDiagnostico}
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: '80%',
  },
  text: {
    color: 'black',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
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
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});

export default EditarPaciente;
