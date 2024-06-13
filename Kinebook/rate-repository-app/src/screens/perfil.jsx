import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const Perfil = ({ route, navigation }) => {
  const { kinesiologoId } = route.params;
  const [kinesiologo, setKinesiologo] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.0.10:3000/api/kinesiologo/${kinesiologoId}`)
      .then(response => response.json())
      .then(data => {
        setKinesiologo(data);
      })
      .catch(error => console.error('Error al realizar la solicitud:', error));
  }, [kinesiologoId]);

  if (!kinesiologo) {
    return <Text>Loading...</Text>;
  }

  return (
    <ImageBackground source={require('../img/background.jpg')} resizeMode='cover' style={{ width, height }}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.text}>Nombre Completo: {kinesiologo.nombre} {kinesiologo.apellido}</Text>
          <Text style={styles.text}>Correo: {kinesiologo.correo}</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Evaluaciones', { kinesiologoId })}>
            <Text style={styles.buttonText}>Ver Evaluaciones</Text>
          </TouchableOpacity>
        </View>
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
  box: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: '80%',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#77CFAF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Perfil;
