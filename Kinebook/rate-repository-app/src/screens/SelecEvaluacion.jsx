import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const background = require('../img/BackgroundLobby.jpeg');

const SelectEvaluation = ({ navigation, route }) => {
  const { kinesiologoId } = route.params;

  const handleSelect = (type) => {
    navigation.navigate('Evaluaciones', { type, kinesiologoId });
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleSelect('NeuroMuscular')}>
            <Text style={styles.buttonText}>NeuroMuscular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleSelect('MusculoEsqueletico')}>
            <Text style={styles.buttonText}>MusculoEsqueletico</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleSelect('SensorioPerceptivo')}>
            <Text style={styles.buttonText}>Sensorio Perceptivo</Text>
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
  buttonContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#77CFAF',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectEvaluation;
