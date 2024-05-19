import React from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';

const Main = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../img/image.png')} style={styles.image} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry />
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Login</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0EE7D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    width: 300,
    marginTop: 20,
  },
  buttonText: {
    color: 'blue',
    textAlign: 'center',
  },
});

export default Main;