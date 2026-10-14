import { Pressable, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DespesasProvider from './src/store/despesas-context';
import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function VisaoGeral() {
  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('GerenciarDespesa')} style={{ marginRight: 16 }}>
            <Text style={{ fontSize: 26, color: '#3e04c3' }}>+</Text>
          </Pressable>
        ),
      })}
    >
      <Tabs.Screen name="Recentes" component={DespesasRecentes} options={{ title: 'Recentes' }} />
      <Tabs.Screen name="Todas" component={TodasDespesas} options={{ title: 'Todas as Despesas' }} />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <DespesasProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="VisaoGeral" component={VisaoGeral} options={{ headerShown: false }} />
            <Stack.Screen
              name="GerenciarDespesa"
              component={GerenciarDespesa}
              options={{ presentation: 'modal' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DespesasProvider>
    </>
  );
}