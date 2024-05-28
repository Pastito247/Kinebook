import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet , ImageBackground} from 'react-native';
import axios from 'axios';
const background = { uri: 'https://i.ibb.co/XV0ZzK4/Background.jpg' };

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  function handleRegistro(){
    const datos ={
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      contrasena: contraseña
    }
    axios.post("http://192.168.0.5:3000/register", datos)
    .then((res)=> console.log(res.data))
    .catch(e=>console.log(e));
  };

  return (
    <ImageBackground source={background} resizeMode='cover' style={styles.background}>
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Kinesiólogo</Text>
      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Apellido"
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        placeholder="Correo"
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        value={contraseña}
        onChangeText={setContraseña}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleRegistro()}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    background: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 150,
    },
    input: {
      height: 40,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
    },
    button: {
      backgroundColor: '#77CFAF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default Registro;
