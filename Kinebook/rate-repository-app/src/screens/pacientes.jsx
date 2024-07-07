import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const background = require('../img/BackgroundLobby.jpeg');

const Pacientes = ({ route }) => {
  const { kinesiologoId } = route.params;
  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const fetchPacientes = () => {
    fetch(`http://192.168.0.6:3000/api/pacientes?kinesiologoId=${kinesiologoId}`)
      .then(response => response.json())
      .then(data => {
        setPacientes(data);
        setFilteredPacientes(data);
      })
      .catch(error => console.error('Error al obtener los pacientes:', error));
  };

  useEffect(() => {
    fetchPacientes();
  }, [kinesiologoId]);

  useEffect(() => {
    if (searchText === '') {
      setFilteredPacientes(pacientes);
    } else {
      setFilteredPacientes(
        pacientes.filter(paciente =>
          paciente.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
          paciente.apellidoPaterno.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  }, [searchText, pacientes]);

  const handleAgregarEvaluacion = (pacienteId) => {
    navigation.navigate('SelectEvaluation', { kinesiologoId, pacienteId });
  };

  const handleVerEvaluaciones = (pacienteId) => {
    navigation.navigate('DetalleEvaluacion', { kinesiologoId, pacienteId });
  };

  const handleVerDetallePaciente = (pacienteId) => {
    navigation.navigate('DetallePaciente', { pacienteId, kinesiologoId });
  };

  const handleBorrarPaciente = (pacienteId) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este paciente?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () => {
            fetch(`http://192.168.0.6:3000/api/pacientes/${pacienteId}`, {
              method: 'DELETE',
            })
              .then(response => {
                if (response.ok) {
                  Alert.alert(
                    "Éxito",
                    "Paciente eliminado correctamente.",
                    [{ text: "OK", onPress: () => fetchPacientes() }],
                    { cancelable: false }
                  );
                } else {
                  console.error('Error al borrar el paciente:', response.statusText);
                }
              })
              .catch(error => {
                console.error('Error al borrar el paciente:', error);
                Alert.alert(
                  "Error",
                  "Hubo un problema al eliminar el paciente. Inténtalo de nuevo más tarde.",
                  [{ text: "OK" }],
                  { cancelable: false }
                );
              });
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar paciente por nombre"
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          data={filteredPacientes}
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
              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleBorrarPaciente(item._id)}>
                <Text style={styles.buttonText}>Borrar Paciente</Text>
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
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)', // Fondo blanco semitransparente
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
    backgroundColor: '#95E2C8',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF6F61', // Color rojo para el botón de borrar
    marginTop: 10,
  },
});

export default Pacientes;
