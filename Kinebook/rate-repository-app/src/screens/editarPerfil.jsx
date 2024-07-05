import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const background = require('../img/BackgroundLobby.jpeg');

const EditarPerfil = ({ route, navigation }) => {
  const { kinesiologo } = route.params;
  const [nombre, setNombre] = useState(kinesiologo.nombre);
  const [apellido, setApellido] = useState(kinesiologo.apellido);
  const [correo, setCorreo] = useState(kinesiologo.correo);
  const [contraseña, setContraseña] = useState(''); // Nueva contraseña

  const handleSave = () => {
    const updatedData = { nombre, apellido, correo };
    if (contraseña) {
      updatedData.contraseña = contraseña;
    }

    fetch(`http://192.168.0.2:3000/api/kinesiologos/${kinesiologo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Perfil actualizado:', data);
        navigation.goBack();
      })
      .catch(error => console.error('Error al actualizar el perfil:', error));
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
          <Text style={styles.text}>Apellido</Text>
          <TextInput
            style={styles.input}
            value={apellido}
            onChangeText={setApellido}
          />
          <Text style={styles.text}>Correo</Text>
          <TextInput
            style={styles.input}
            value={correo}
            onChangeText={setCorreo}
          />
          <Text style={styles.text}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={contraseña}
            onChangeText={setContraseña}
            secureTextEntry
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
});

export default EditarPerfil;
