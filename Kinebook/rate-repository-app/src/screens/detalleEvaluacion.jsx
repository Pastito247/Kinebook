import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');
const background = require('../img/BackgroundLobby.jpeg');

const DetalleEvaluaciones = ({ route, navigation }) => {
  const { kinesiologoId } = route.params;
  const [evaluaciones, setEvaluaciones] = useState([]);

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      try {
        const response = await fetch(`http://192.168.0.10:3000/api/evaluaciones?kinesiologoId=${kinesiologoId}`);
        if (!response.ok) {
          throw new Error('Error al obtener las evaluaciones');
        }
        const data = await response.json();
        console.log('Datos de la API:', data);
        setEvaluaciones(data);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchEvaluaciones();
  }, [kinesiologoId]);

  const handleDelete = async (evaluacionId) => {
    try {
      const response = await fetch(`http://192.168.0.10:3000/api/evaluaciones/${evaluacionId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al eliminar la evaluación: ${errorMessage}`);
      }

      setEvaluaciones(evaluaciones.filter(evaluacion => evaluacion._id !== evaluacionId));
    } catch (error) {
      console.error('Error al eliminar la evaluación:', error);
    }
  };

  const renderValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      // Si es un objeto, asume que es un solo par clave-valor y extrae el valor
      const key = Object.keys(value)[0];
      return value[key];
    }
    return value.toString();
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Evaluaciones del Kinesiólogo</Text>
          {evaluaciones.length === 0 ? (
            <Text style={styles.noDataText}>No hay evaluaciones para mostrar</Text>
          ) : (
            evaluaciones.map((evaluacion) => (
              <View key={evaluacion._id} style={styles.evaluacion}>
                <Text style={styles.text}>Nombre del Paciente: {evaluacion.patientName}</Text>
                <Text style={styles.text}>Tipo de Evaluación: {evaluacion.type}</Text>
                <Text style={styles.text}>Resultados:</Text>
                {evaluacion.answers && Object.entries(evaluacion.answers).map(([key, value], idx) => (
                  <Text key={idx} style={styles.resultText}>{`${key}: ${renderValue(value)}`}</Text>
                ))}
                <Text style={styles.text}>Fecha: {new Date(evaluacion.fecha).toLocaleDateString()}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(evaluacion._id)}>
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
              </View>
            ))
          )}
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  evaluacion: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DetalleEvaluaciones;
