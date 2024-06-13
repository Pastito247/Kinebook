import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const background = require('../img/background.jpg');

const Lobby = ({ route }) => {
  const { kinesiologoId } = route.params;
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    fetch(`http://192.168.0.10:3000/api/kinesiologo/${kinesiologoId}`)
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
    <ImageBackground source={background} resizeMode='cover' style={{ width, height }}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Bienvenido {nombre}</Text>
        <Text style={styles.questionText}>¿Qué desea hacer?</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('Evaluaciones', { kinesiologoId })}
        >
          <Text style={styles.optionButtonText}>Ver Evaluaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('NuevaEvaluacion', { kinesiologoId })}
        >
          <Text style={styles.optionButtonText}>Crear Evaluación</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('Profile', { kinesiologoId })}
        >
          <Text style={styles.optionButtonText}>Ver Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
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
  },
  welcomeText: {
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 110,
  },
  questionText: {
    color: 'black',
    fontSize: 18,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#77CFAF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  optionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
});

export default Lobby;