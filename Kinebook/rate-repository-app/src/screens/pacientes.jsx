import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const background = require('../img/BackgroundLobby.jpeg');

const Pacientes = ({ route }) => {
  const { kinesiologoId } = route.params;
  const [pacientes, setPacientes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`http://192.168.0.4:3000/api/pacientes?kinesiologoId=${kinesiologoId}`)
      .then(response => response.json())
      .then(data => setPacientes(data))
      .catch(error => console.error('Error al obtener los pacientes:', error));
  }, [kinesiologoId]);

  const handleAgregarEvaluacion = (pacienteId) => {
    navigation.navigate('SelectEvaluation', { kinesiologoId, pacienteId });
  };

  const handleVerEvaluaciones = (pacienteId) => {
    navigation.navigate('DetalleEvaluacion', { kinesiologoId, pacienteId });
  };

  const handleVerDetallePaciente = (pacienteId) => {
    navigation.navigate('DetallePaciente', { pacienteId, kinesiologoId });
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={pacientes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.pacienteContainer}>
              <Text style={styles.pacienteText}>{item.nombre} {item.apellidoPaterno}</Text>
              <TouchableOpacity style={styles.button} onPress={() => handleAgregarEvaluacion(item._id)}>
                <Text style={styles.buttonText}>Agregar Evaluación</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleVerEvaluaciones(item._id)}>
                <Text style={styles.buttonText}>Ver Evaluaciones</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleVerDetallePaciente(item._id)}>
                <Text style={styles.buttonText}>Ver Detalles</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
    padding: 20,
    marginTop: 30,
  },
  pacienteContainer: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo blanco semitransparente
  },
  pacienteText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Pacientes;
