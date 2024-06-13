import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/screens/main';
import Lobby from './src/screens/lobby';
import Register from './src/screens/register';
import Profile from './src/screens/perfil';
import Evaluaciones from './src/screens/evaluaciones';
import NuevaEvaluacion from './src/screens/nuevaevaluacion';
import DetalleEvaluacion from './src/screens/detalleEvaluacion';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Lobby" component={Lobby} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Evaluaciones" component={Evaluaciones} options={{ headerShown: false }}/>
        <Stack.Screen name="NuevaEvaluacion" component={NuevaEvaluacion} options={{ headerShown: false }}/>
        <Stack.Screen name="DetalleEvaluacion" component={DetalleEvaluacion} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
