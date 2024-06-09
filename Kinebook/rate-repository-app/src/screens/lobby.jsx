import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const background = { uri: 'https://i.ibb.co/XV0ZzK4/Background.jpg' };

const Lobby = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { nombre } = route.params;  // Obtener el nombre del usuario de los parámetros de navegación

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    // Aquí puedes añadir la lógica para cerrar sesión si es necesario
    navigation.navigate('Main');
  };

  return (
    <ImageBackground source={background} resizeMode='cover' style={{ width, height }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'black', fontSize: 20, marginBottom: 20 }}>Bienvenido {nombre}</Text>
        <TouchableOpacity style={{ backgroundColor: '#77CFAF', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, position: 'absolute', top: 40, left: 20 }} onPress={toggleMenu}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Menú</Text>
        </TouchableOpacity>
        {menuVisible && (
          <View style={{ backgroundColor: 'white', borderRadius: 5, width: '80%', alignItems: 'center', position: 'absolute', top: 80, left: 20, paddingVertical: 10 }}>
            <TouchableOpacity style={{ paddingVertical: 10, width: '100%', alignItems: 'center' }} onPress={() => navigation.navigate('Profile')}>
              <Text style={{ color: '#333' }}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingVertical: 10, width: '100%', alignItems: 'center' }} onPress={() => navigation.navigate('Evaluation')}>
              <Text style={{ color: '#333' }}>Iniciar evaluación</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingVertical: 10, width: '100%', alignItems: 'center' }} onPress={handleLogout}>
              <Text style={{ color: '#FF6B6B' }}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default Lobby;
