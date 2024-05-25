import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/screens/main.jsx';
import Register from './src/screens/register.jsx';
import Lobby from './src/screens/lobby.jsx';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Lobby" component={Lobby} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
