import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');
const background = require('../img/BackgroundLobby.jpeg');

const calcularEdad = (fechaNacimiento) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
};

const DetallePaciente = ({ route }) => {
  const { pacienteId } = route.params;
  const [paciente, setPaciente] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await fetch(`http://192.168.0.2:3000/api/pacientes/${pacienteId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los detalles del paciente');
        }
        const responseText = await response.text();
        try {
          const data = JSON.parse(responseText);
          console.log('Datos de la API:', data);
          setPaciente(data);
        } catch (jsonParseError) {
          console.error('Error al parsear la respuesta JSON:', jsonParseError);
          console.error('Respuesta recibida:', responseText);
          setError('Error al procesar los datos del paciente');
        }
      } catch (error) {
        console.error('Error al obtener los detalles del paciente:', error);
        setError('Error al obtener los detalles del paciente');
      }
    };

    fetchPaciente();
  }, [pacienteId]);

  if (error) {
    return (
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.noDataText}>{error}</Text>
        </View>
      </ImageBackground>
    );
  }

  if (!paciente) {
    return (
      <ImageBackground source={background} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.noDataText}>Cargando detalles del paciente...</Text>
        </View>
      </ImageBackground>
    );
  }

  const edad = calcularEdad(paciente.fechaNacimiento);

  return (
    <ImageBackground source={background} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Detalles del Paciente</Text>
          <Text style={styles.text}>Nombre Completo:</Text>
          <Text style={styles.text}>{`${paciente.nombre} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno || ''}`}</Text>
          <Text style={styles.text}>Edad: {edad} años</Text>
          <Text style={styles.text}>RUT: {paciente.rut}</Text>
          <Text style={styles.text}>Diagnóstico: {paciente.diagnostico}</Text>
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
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});

export default DetallePaciente;
