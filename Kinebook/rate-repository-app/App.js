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
import SelectEvaluation from './src/screens/SelecEvaluacion';
import AgregarPaciente from './src/screens/agregarPaciente';
import AgregarEvaluacion from './src/screens/agregarEvaluacion';
import Pacientes from './src/screens/pacientes';
import DetallePaciente from './src/screens/detallePaciente'
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Lobby" component={Lobby} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerTitle: 'Perfil', headerStyle:{
          backgroundColor: '#388E71',
        }, headerTintColor: '#FFFFFF'   }} />
        <Stack.Screen name="Evaluaciones" component={Evaluaciones} options={{ headerTitle: '', headerStyle:{
          backgroundColor: '#388E71',
        }, headerTintColor: '#FFFFFF' }}/>
        <Stack.Screen name="NuevaEvaluacion" component={NuevaEvaluacion} options={{ headerShown: false }}/>
        <Stack.Screen name="DetalleEvaluacion" component={DetalleEvaluacion} options={{ headerTitle: 'Evaluaciones', headerStyle:{
          backgroundColor: '#388E71',
        }, headerTintColor: '#FFFFFF' }}/>
        <Stack.Screen name="SelectEvaluation" component={SelectEvaluation} options={{ headerTitle: '', headerStyle:{
          backgroundColor: '#388E71',
        }, headerTintColor: '#FFFFFF' }}/>
        <Stack.Screen name="Pacientes" component={Pacientes} options={{ headerTitle: 'Pacientes', headerStyle:{
          backgroundColor: '#388E71',
        }, headerTintColor: '#FFFFFF'  }}/>
        <Stack.Screen name="AgregarPaciente" component={AgregarPaciente} options={{ headerTitle: 'Agregar Paciente', headerStyle:{
          backgroundColor: '#388E71',
        }, headerTintColor: '#FFFFFF'   }}/>
        <Stack.Screen name="AgregarEvaluacion" component={AgregarEvaluacion} options={{ headerShown: false }}/>
        <Stack.Screen name="DetallePaciente" component={DetallePaciente} options={{ headerTitle: 'Detalles del Paciente', headerStyle:{
          backgroundColor: '#388E71',
        }, headerTintColor: '#FFFFFF'  }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
