import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const background = require('../img/BackgroundLobby.jpeg');

const Lobby = ({ route }) => {
  const { kinesiologoId } = route.params;
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    fetch(`http://192.168.0.4:3000/api/kinesiologo/${kinesiologoId}`)
      .then(response => response.json())
      .then(data => {
        setNombre(data.nombre);
      })
      .catch(error => console.error('Error al realizar la solicitud:', error));
  }, [kinesiologoId]);

  const handleLogout = () => {
    navigation.navigate('Main');
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Bienvenido {nombre}</Text>
          <Text style={styles.questionText}>¿Qué desea hacer?</Text>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('Pacientes', { kinesiologoId })}
          >
            <Text style={styles.optionButtonText}>Ver Pacientes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('AgregarPaciente', { kinesiologoId })}
          >
            <Text style={styles.optionButtonText}>Agregar Paciente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('Profile', { kinesiologoId })}
          >
            <Text style={styles.optionButtonText}>Ver Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleLogout}
          >
            <Text style={styles.optionButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo blanco semitransparente
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  welcomeText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  questionText: {
    color: 'black',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#77CFAF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Lobby;
