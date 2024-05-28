import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';

const background = { uri: 'https://i.ibb.co/XV0ZzK4/Background.jpg' };

const Registro = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleRegistro = async () => {
    try {
      const response = await fetch('http://192.168.0.5:3000/api/kinesiologos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, correo, contraseña }),
      });
      if (!response.ok) {
        throw new Error('Error al registrar el kinesiólogo');
      }
      // Si la solicitud es exitosa, puedes mostrar un mensaje al usuario y redirigirlo al Lobby
      Alert.alert('Éxito', 'Kinesiólogo registrado exitosamente');
      navigation.navigate('lobby');
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
      Alert.alert('Error', 'Ocurrió un error al registrar el kinesiólogo');
    }
  };

  return (
    <ImageBackground source={background} resizeMode='cover' style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Registro de Kinesiólogo</Text>
        <TextInput
          placeholder="Nombre"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          placeholder="Apellido"
          style={styles.input}
          value={apellido}
          onChangeText={setApellido}
        />
        <TextInput
          placeholder="Correo"
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          secureTextEntry
          value={contraseña}
          onChangeText={setContraseña}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegistro}>
          <Text style={styles.buttonText}>Registrarse</Text>
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
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 150,
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#77CFAF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Registro;
