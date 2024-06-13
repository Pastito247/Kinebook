import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const DetalleEvaluacion = ({ route }) => {
  const { evaluacionId } = route.params;
  const [evaluacion, setEvaluacion] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.0.10:3000/api/evaluaciones/${evaluacionId}`)
      .then(response => response.json())
      .then(data => {
        setEvaluacion(data);
      })
      .catch(error => console.error('Error al realizar la solicitud:', error));
  }, [evaluacionId]);

  if (!evaluacion) {
    return <Text>Loading...</Text>;
  }

  return (
    <ImageBackground source={require('../img/background.jpg')} resizeMode='cover' style={{ width, height }}>
      <View style={styles.container}>
        <Text style={styles.text}>Paciente: {evaluacion.nombrePaciente}</Text>
        <Text style={styles.text}>Fecha: {new Date(evaluacion.fecha).toLocaleDateString()}</Text>
        <Text style={styles.text}>Escala Brazo Izquierdo: {evaluacion.escalas.brazoIzquierdo}</Text>
        <Text style={styles.text}>Escala Brazo Derecho: {evaluacion.escalas.brazoDerecho}</Text>
        <Text style={styles.text}>Escala Pierna Izquierda: {evaluacion.escalas.piernaIzquierda}</Text>
        <Text style={styles.text}>Escala Pierna Derecha: {evaluacion.escalas.piernaDerecha}</Text>
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
  text: {
    color: 'black',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DetalleEvaluacion;
