import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const background = { uri: 'https://i.ibb.co/XV0ZzK4/Background.jpg' };

const Lobby = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <ImageBackground source={background} resizeMode='cover' style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Text style={styles.menuButtonText}>Menú</Text>
        </TouchableOpacity>
        {menuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.menuItemText}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Evaluation')}>
              <Text style={styles.menuItemText}>Iniciar evaluación</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    backgroundColor: '#77CFAF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  menuButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuItem: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  menuItemText: {
    color: '#333',
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Lobby;
