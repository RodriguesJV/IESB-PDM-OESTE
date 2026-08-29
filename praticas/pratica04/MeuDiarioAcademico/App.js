import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Switch } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { APP_TITLE,INPUT_PLACEHOLDER,BUTTON_TEXT,LIST_TITLE,} from './labels';


const disciplinas = [
  { id: '1', nome: 'Programação para Dispositivos Móveis' },
  { id: '2', nome: 'Aprendizagem de Máquina' },
  { id: '3', nome: 'Métricas e Arquitetura de Software' },
  { id: '4', nome: 'Auditoria e Segurança no Desenvolvimento de Aplicações' },
];

export default function App() {

  const [mostrarApenasObrigatorias, setMostrarApenasObrigatorias] = useState(false);

  return (
    
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      
        <Text style={styles.title}>{APP_TITLE}</Text>

    
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder={INPUT_PLACEHOLDER}
          />
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              styles.buttonWrapper,
              pressed && styles.buttonWrapperPressed,
            ]}
          >
            <Text style={styles.buttonText}>{BUTTON_TEXT}</Text>
          </Pressable>
        </View>

       
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Mostrar apenas obrigatórias</Text>
          <Switch
            value={mostrarApenasObrigatorias}
            onValueChange={setMostrarApenasObrigatorias}
          />
        </View>

        
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
    flex: 1, 
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  input: {
    width: '70%', 
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
    alignItems: 'center', 
    justifyContent: 'center',
  },
  buttonWrapperPressed: {
    backgroundColor: '#1769aa', 
    opacity: 0.85,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center', 
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