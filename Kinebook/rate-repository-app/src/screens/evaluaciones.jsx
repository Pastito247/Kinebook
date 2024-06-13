import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, FlatList } from 'react-native';

const { width, height } = Dimensions.get('window');

const Evaluaciones = ({ route, navigation }) => {
  const { kinesiologoId } = route.params;
  const [evaluaciones, setEvaluaciones] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.0.10:3000/api/evaluaciones?kinesiologoId=${kinesiologoId}`)
      .then(response => response.json())
      .then(data => {
        setEvaluaciones(data);
      })
      .catch(error => console.error('Error al realizar la solicitud:', error));
  }, [kinesiologoId]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Evaluación ID: {item._id}</Text>
      <Text style={styles.itemText}>Nombre del Paciente: {item.nombrePaciente}</Text>
      <Text style={styles.itemText}>Fecha: {new Date(item.fecha).toLocaleDateString()}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DetalleEvaluacion', { evaluacionId: item._id })}>
        <Text style={styles.buttonText}>Ver Detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground source={require('../img/background.jpg')} resizeMode='cover' style={{ width, height }}>
      <View style={styles.container}>
        <FlatList
          data={evaluaciones}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,  // Margen superior
  },
  listContent: {
    alignItems: 'center',
    paddingBottom: 20,  // Para un pequeño margen inferior también
  },
  button: {
    backgroundColor: '#77CFAF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: width * 0.8,
    marginBottom: 20,
    alignItems: 'center',
  },
  itemText: {
    color: 'black',
    fontSize: 18,
  },
});

export default Evaluaciones;