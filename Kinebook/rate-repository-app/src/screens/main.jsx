import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert, Dimensions, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const background = require('../img/background.jpg');
const welcomeImage = require('../img/welcome.jpg');

const Main = ({ navigation }) => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.2:3000/api/login', {
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
      navigation.navigate('Lobby', { kinesiologoId: result.kinesiologoId });
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };

  useFocusEffect(
    useCallback(() => {
      setCorreo('');
      setContraseña('');
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust this value if needed
    >
      <ImageBackground source={background} style={styles.background}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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
          <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.register}>Registrate</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
