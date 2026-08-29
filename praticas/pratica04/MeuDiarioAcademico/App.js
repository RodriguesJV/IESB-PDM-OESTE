import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Switch } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  APP_TITLE,
  INPUT_PLACEHOLDER,
  BUTTON_TEXT,
  LIST_TITLE,
} from './labels';

// Lista estática por enquanto — o foco desta atividade é layout e componentes,
// não persistência ou estado real da lista.
const disciplinas = [
  { id: '1', nome: 'Programação para Dispositivos Móveis' },
  { id: '2', nome: 'Banco de Dados' },
  { id: '3', nome: 'Engenharia de Software' },
  { id: '4', nome: 'Redes de Computadores' },
];

export default function App() {
  // Estado do Switch — por enquanto só controla o valor exibido,
  // sem aplicar filtro real na lista (conforme pedido no desafio opcional).
  const [mostrarApenasObrigatorias, setMostrarApenasObrigatorias] = useState(false);

  return (
    // SafeAreaProvider precisa envolver toda a árvore para que o
    // SafeAreaView (e outros hooks de safe area) funcionem corretamente.
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Cabeçalho */}
        <Text style={styles.title}>{APP_TITLE}</Text>

        {/* Linha com input (~70%) e botão (~28%) */}
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder={INPUT_PLACEHOLDER}
          />
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              styles.buttonWrapper,
              pressed && styles.buttonWrapperPressed, // estilo aplicado só enquanto pressionado
            ]}
          >
            <Text style={styles.buttonText}>{BUTTON_TEXT}</Text>
          </Pressable>
        </View>

        {/* Switch opcional — ainda sem lógica de filtro real */}
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Mostrar apenas obrigatórias</Text>
          <Switch
            value={mostrarApenasObrigatorias}
            onValueChange={setMostrarApenasObrigatorias}
          />
        </View>

        {/* Lista de disciplinas */}
        <Text style={styles.listTitle}>{LIST_TITLE}</Text>

        <View style={styles.list}>
          {disciplinas.map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemText}>{item.nome}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa toda a área segura da tela
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    // alignItems 'center': alinha input e botão na mesma linha vertical,
    // já que o Button tem altura fixa diferente do TextInput.
    alignItems: 'center',
    // justifyContent 'space-between': empurra o botão para a direita,
    // deixando o espaço livre entre ele e o input.
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  input: {
    width: '70%', // uso de largura percentual (exigido no item 4-D)
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    width: '28%',
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center', // centraliza o texto dentro do botão
    justifyContent: 'center',
  },
  buttonWrapperPressed: {
    backgroundColor: '#1769aa', // tom mais escuro para indicar "pressionado"
    opacity: 0.85,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center', // alinha o texto e o switch na mesma linha vertical
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 14,
    color: '#333',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  list: {
    flex: 1, 
  },
  item: {
    margin: 5,
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
  },
  itemText: {
    fontSize: 16,
  },
});