import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, ImageBackground } from 'react-native';

const background = {uri: 'https://i.ibb.co/XV0ZzK4/Background.jpg'};

const Main = () => {
  return (
    <ImageBackground source={background} resizeMode='cover' style={styles.background}>
    <View style={styles.container}>
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry />
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Login</Text>
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
  background:{
    flex: 1,
    justifyContent: 'center',
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
    width: 300,
    marginTop: 20,
  },
  buttonText: {
    color: 'blue',
    textAlign: 'center',
  },
});

export default Main;