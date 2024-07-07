import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const background = require('../img/BackgroundLobby.jpeg');

const Perfil = ({ route }) => {
  const { kinesiologoId } = route.params;
  const [kinesiologo, setKinesiologo] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`http://192.168.0.6:3000/api/kinesiologo/${kinesiologoId}`)
      .then(response => response.json())
      .then(data => {
        setKinesiologo(data);
        console.log(kinesiologoId);
      })
      .catch(error => console.error('Error al realizar la solicitud:', error));
  }, [kinesiologoId]);

  if (!kinesiologo) {
    return <Text>Loading...</Text>;
  }

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.text}>Nombre Completo: </Text>
          <Text>{kinesiologo.nombre} {kinesiologo.apellido}</Text>
          <Text style={styles.text}>Correo: </Text>
          <Text>{kinesiologo.correo}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditarPerfil', { kinesiologo, kinesiologoId })}
          >
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
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
