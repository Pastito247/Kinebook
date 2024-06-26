import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const background = require('../img/BackgroundLobby.jpeg');

const AgregarPaciente = ({ route }) => {
  const { kinesiologoId } = route.params;
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const navigation = useNavigation();

  const validarRut = (rut) => {
    rut = rut.replace(/\./g, '').replace('-', '');
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = 1; i <= cuerpo.length; i++) {
      const index = multiplo * rut.charAt(cuerpo.length - i);
      suma = suma + index;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    let dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dvFinal === dv;
  };

  const handleAgregarPaciente = () => {
    if (!validarRut(rut)) {
      Alert.alert('RUT inválido', 'Por favor ingrese un RUT válido.');
      return;
    }

    fetch('http://192.168.0.2:3000/api/pacientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rut,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimiento,
        diagnostico,
        kinesiologoId,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Paciente agregado exitosamente') {
          navigation.navigate('Pacientes', { kinesiologoId });
        } else {
          console.error('Error en la respuesta del servidor:', data);
        }
      })
      .catch(error => console.error('Error al realizar la solicitud:', error));
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.label}>RUT:</Text>
            <TextInput style={styles.input} value={rut} onChangeText={setRut} placeholder="12345678-9" />
            <Text style={styles.label}>Nombre:</Text>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
            <Text style={styles.label}>Apellido Paterno:</Text>
            <TextInput style={styles.input} value={apellidoPaterno} onChangeText={setApellidoPaterno} />
            <Text style={styles.label}>Apellido Materno (opcional):</Text>
            <TextInput style={styles.input} value={apellidoMaterno} onChangeText={setApellidoMaterno} />
            <Text style={styles.label}>Fecha de Nacimiento:</Text>
            <TextInput style={styles.input} value={fechaNacimiento} onChangeText={setFechaNacimiento} placeholder="YYYY-MM-DD" />
            <Text style={styles.label}>Diagnóstico:</Text>
            <TextInput style={styles.input} value={diagnostico} onChangeText={setDiagnostico} />
            <Button title="Agregar Paciente" onPress={handleAgregarPaciente} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});

export default AgregarPaciente;
