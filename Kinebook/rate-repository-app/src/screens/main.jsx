import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';

const background = { uri: 'https://i.ibb.co/XV0ZzK4/Background.jpg' };

const Main = ({ navigation }) => {
  return (
    <ImageBackground source={background} resizeMode='cover' style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../img/welcome.jpg')} style={styles.image} />
        <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry />
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Olvide mi contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Lobby')}>
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