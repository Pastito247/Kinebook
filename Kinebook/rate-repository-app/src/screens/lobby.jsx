import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../data/AuthContext';

const { width, height } = Dimensions.get('window');
const background = require('../img/BackgroundLobby.jpeg');

const Lobby = ({ route }) => {
  const { kinesiologoId } = route.params;
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://192.168.0.2:3000/api/kinesiologo/${kinesiologoId}`)
      .then(response => response.json())
      .then(data => {
        setNombre(data.nombre);
      })
      .catch(error => console.error('Error al realizar la solicitud:', error));
  }, [kinesiologoId]);

  const handleLogout = () => {
    logout();
    navigation.navigate('Main');
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Bienvenido {nombre}</Text>
          <Text style={styles.questionText}>¿Qué desea hacer?</Text>
          <View style={styles.optionsContainer}>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 20,
  },
  questionText: {
    fontSize: 18,
    color: '#000',
    marginVertical: 20,
  },
  optionsContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
  },
  optionButton: {
    backgroundColor: '#77CFAF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  optionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Lobby;
