import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image, Switch, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const dermatomas = require('../img/Dermatomas.jpg');
const background = require('../img/BackgroundLobby.jpeg');

const Evaluation = ({ route, navigation }) => {
  const { type, kinesiologoId, pacienteId } = route.params;
  const [answers, setAnswers] = useState({});
  const [irradiation, setIrradiation] = useState(false);

  const questions = {
    NeuroMuscular: [
      { segment: 'L2', mrc: '', description: '' },
      { segment: 'L3', mrc: '', description: '' },
      { segment: 'L4', mrc: '', description: '' },
      { segment: 'L5', mrc: '', description: '' },
      { segment: 'S1', mrc: '', description: '' },
    ],
    MusculoEsqueletico: [
      'Flexión columna:',
      'Extensión columna:',
      'Rotación derecha columna:',
      'Rotación izquierda columna:',
      'Inclinación izquierda columna:',
      'Inclinación derecha columna:',
      'Flexión cadera:',
      'Extensión cadera:',
      'Rotación interna cadera:',
      'Rotación externa cadera:',
    ],
    SensorioPerceptivo: [
      'Antigüedad del dolor:',
      'Localización:',
      'Intensidad (0-10):',
      'Características:',
      'Irradiación:',
      'Atenuantes y agravantes:',
      '¿Por dónde le duele?',
    ],
  };

  const handleChange = (text, key, field) => {
    const newAnswers = { ...answers };
    newAnswers[key] = newAnswers[key] || {};
    newAnswers[key][field] = text;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas guardar esta evaluación?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Guardar',
          onPress: () => {
            const formattedAnswers = {
              ...answers,
              ...questions.NeuroMuscular.reduce((acc, question) => {
                if (answers[question.segment]) {
                  acc[question.segment] = {
                    mrc: answers[question.segment].mrc,
                    description: answers[question.segment].description,
                  };
                }
                return acc;
              }, {}),
            };

            fetch('http://192.168.0.4:3000/api/evaluaciones', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type,
                answers: formattedAnswers,
                kinesiologoId,
                pacienteId,
                fecha: new Date(),
              }),
            })
              .then(response => response.json())
              .then(data => {
                if (data.message === 'Evaluacion agregada exitosamente') {
                  Alert.alert(
                    'Evaluación guardada',
                    '¿Quieres crear otra evaluación?',
                    [
                      {
                        text: 'No',
                        onPress: () => navigation.navigate('Lobby', { kinesiologoId }),
                      },
                      {
                        text: 'Sí',
                        onPress: () => navigation.navigate('SelectEvaluation', { kinesiologoId, pacienteId }),
                      },
                    ]
                  );
                } else {
                  console.error('Error en la respuesta del servidor:', data);
                }
              })
              .catch(error => console.error('Error al realizar la solicitud:', error));
          },
        },
      ]
    );
  };

  const renderNeuroMuscular = () => {
    const mrcOptions = ['M0', 'M1', 'M2', 'M3', 'M3+', 'M4-', 'M4', 'M4+', 'M5'];
    return questions[type].map((question, index) => (
      <View key={index} style={styles.segmentContainer}>
        <Text style={styles.segmentText}>{`Segmento ${question.segment}`}</Text>
        <Picker
          selectedValue={answers[question.segment]?.mrc || ''}
          style={styles.picker}
          onValueChange={(itemValue) => handleChange(itemValue, question.segment, 'mrc')}
        >
          {mrcOptions.map((option, i) => (
            <Picker.Item key={i} label={option} value={option} />
          ))}
        </Picker>
        <Text style={styles.descriptionLabel}>Descripción</Text>
        <TextInput
          style={styles.descriptionInput}
          multiline
          onChangeText={(text) => handleChange(text, question.segment, 'description')}
          value={answers[question.segment]?.description || ''}
        />
      </View>
    ));
  };

  const renderSensorioPerceptivo = () => (
    <>
      <Text style={styles.questionText}>Antigüedad del dolor:</Text>
      <Picker
        selectedValue={answers['antiguedad'] || ''}
        onValueChange={(value) => handleChange(value, 'antiguedad', 'antiguedad')}
        style={styles.input}
      >
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Agudo" value="Agudo" />
        <Picker.Item label="Subagudo" value="Subagudo" />
        <Picker.Item label="Crónico" value="Crónico" />
      </Picker>

      <Text style={styles.questionText}>Localización:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange(text, 'localizacion', 'localizacion')}
        value={answers['localizacion'] || ''}
      />

      <Text style={styles.questionText}>Intensidad (0-10):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => handleChange(text, 'intensidad', 'intensidad')}
        value={answers['intensidad'] || ''}
      />

      <Text style={styles.questionText}>Características:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange(text, 'caracteristicas', 'caracteristicas')}
        value={answers['caracteristicas'] || ''}
      />

      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxLabel}>Irradiación</Text>
        <Switch
          value={irradiation}
          onValueChange={(newValue) => setIrradiation(newValue)}
        />
      </View>

      {irradiation && (
        <>
          <Text style={styles.questionText}>Zona de Irradiación:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange(text, 'zonaIrradiacion', 'zonaIrradiacion')}
            value={answers['zonaIrradiacion'] || ''}
          />
        </>
      )}

      <Text style={styles.questionText}>Atenuantes y agravantes:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange(text, 'atenuantesAgravantes', 'atenuantesAgravantes')}
        value={answers['atenuantesAgravantes'] || ''}
      />

      <Text style={styles.questionText}>¿Por dónde le duele?</Text>
      <Image source={dermatomas} style={styles.image} />
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleChange(text, 'seccionDolor', 'seccionDolor')}
        value={answers['seccionDolor'] || ''}
      />
    </>
  );

  const renderQuestions = () => {
    if (type === 'SensorioPerceptivo') {
      return renderSensorioPerceptivo();
    } else if (type === 'NeuroMuscular') {
      return renderNeuroMuscular();
    } else if (type === 'MusculoEsqueletico') {
      return questions[type].map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question}</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange(text, index, 'answer')}
            value={answers[index]?.answer || ''}
          />
        </View>
      ));
    }

    return null;
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{type}</Text>
          {renderQuestions()}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Guardar Evaluación</Text>
          </TouchableOpacity>
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
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  segmentContainer: {
    marginBottom: 20,
  },
  segmentText: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  descriptionInput: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default Evaluation;
