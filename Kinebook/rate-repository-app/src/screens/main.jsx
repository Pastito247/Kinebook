import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const backgroundImage = { uri: 'https://i.ibb.co/XV0ZzK4/Background.jpg' };
const welcomeImage = require('../img/welcome.jpg');

const Main = ({ navigation }) => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.10:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contraseña }),
      });
      if (!response.ok) {
        throw new Error('Correo o contraseña incorrectos');
      }
      const result = await response.json();
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
      console.log('Inicio de sesión exitoso:', result);
      navigation.navigate('Lobby', { nombre: result.nombre }); // Pasar el nombre del usuario aquí
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Limpia los inputs cuando la pantalla gana el foco
      setCorreo('');
      setContraseña('');
    }, [])
  );

  return (
    <ImageBackground source={backgroundImage} resizeMode='cover' style={styles.background}>
      <View style={styles.container}>
        <Image source={welcomeImage} style={styles.image} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={contraseña}
          onChangeText={setContraseña}
        />
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Olvide mi contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.register}>Registrate</Text>
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
    width: '100%',
    justifyContent: 'center',
  },
  image: {
    marginTop: 100,
    marginBottom: 20,
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
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  forgotPassword: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: '#77CFAF',
    paddingVertical: 10,
    width: '100%',
    borderRadius: 60,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  register: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Main;
