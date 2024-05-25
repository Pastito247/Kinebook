import React from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Image , TouchableOpacity } from 'react-native';

const background = { uri: 'https://i.ibb.co/XV0ZzK4/Background.jpg' };

const Register = ({ navigation }) => {
  return (
    <ImageBackground source={background} resizeMode='cover' style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../img/welcome.jpg')} style={styles.image} />
        <TextInput placeholder="Nombre Completo" style={styles.input} />
        <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Lobby')}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Text style={styles.register}>Ya tienes una cuenta? Inicia sesión</Text>
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

export default Register;
