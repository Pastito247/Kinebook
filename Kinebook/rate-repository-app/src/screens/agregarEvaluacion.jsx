// AgregarEvaluacion.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AgregarEvaluacion = ({ route }) => {
  const { kinesiologoId, pacienteId } = route.params;
  const [type, setType] = useState('');
  const [answers, setAnswers] = useState('');
  const navigation = useNavigation();

  const handleAgregarEvaluacion = () => {
    fetch('http://192.168.0.4:3000/api/evaluaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        answers: JSON.parse(answers),
        kinesiologoId,
        pacienteId,
        fecha: new Date(),
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Evaluacion agregada exitosamente') {
          navigation.navigate('DetalleEvaluaciones', { kinesiologoId, pacienteId });
        } else {
          console.error('Error en la respuesta del servidor:', data);
        }
      })
      .catch(error => console.error('Error al realizar la solicitud:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Evaluación:</Text>
      <TextInput style={styles.input} value={type} onChangeText={setType} />
      <Text style={styles.label}>Respuestas (en formato JSON):</Text>
      <TextInput style={styles.input} value={answers} onChangeText={setAnswers} multiline />
      <Button title="Agregar Evaluación" onPress={handleAgregarEvaluacion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

export default AgregarEvaluacion;
