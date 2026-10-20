import { Pressable } from 'react-native';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ExpensesContextProvider } from './src/store/expenses-context';
import { getTheme } from './src/constants/theme';
import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function VisaoGeral() {
  const colors = getTheme(useColorScheme());

  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('GerenciarDespesa')} style={{ marginRight: 16 }}>
            <Ionicons name="add" size={30} color={colors.primary} />
          </Pressable>
        ),
      })}
    >
      <Tabs.Screen
        name="Recentes"
        component={DespesasRecentes}
        options={{
          title: 'Recentes',
          tabBarIcon: ({ color, size }) => <Ionicons name="time-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="Todas"
        component={TodasDespesas}
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" color={color} size={size} />,
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();
  const colors = getTheme(scheme);
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;

  // tema do React Navigation (cabeçalho, abas, fundo) acompanhando o nosso theme.js
  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <ExpensesContextProvider>
      <StatusBar style="auto" />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator>
          <Stack.Screen name="VisaoGeral" component={VisaoGeral} options={{ headerShown: false }} />
          <Stack.Screen
            name="GerenciarDespesa"
            component={GerenciarDespesa}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}