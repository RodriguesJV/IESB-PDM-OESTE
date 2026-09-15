import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);

  // useEffect de CARGA: roda uma vez ao montar o app
  useEffect(() => {
    async function carregarMetas() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados !== null) {
          setMetas(JSON.parse(dados));
        }
      } catch (erro) {
        console.log('Erro ao carregar metas:', erro);
        Alert.alert('Erro', 'Não foi possível carregar suas metas salvas.');
      }
    }
    carregarMetas();
  }, []);

  // useEffect de SALVAMENTO: roda toda vez que "metas" mudar
  useEffect(() => {
    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        console.log('Erro ao salvar metas:', erro);
        Alert.alert('Erro', 'Não foi possível salvar suas metas.');
      }
    }
    salvarMetas();
  }, [metas]);

  function handleAdd() {
    if (texto.trim() === '') {
      Alert.alert('Atenção', 'Digite uma meta antes de adicionar.');
      return;
    }
    const novaMeta = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadaEm: new Date().toISOString(),
      concluida: false,
    };
    setMetas((atuais) => [...atuais, novaMeta]); // nunca usa push/mutate
    setTexto('');
  }

  function handleDelete(id) {
    setMetas((atuais) => atuais.filter((m) => m.id !== id));
  }

  function handleToggle(id) {
    setMetas((atuais) =>
      atuais.map((m) => (m.id === id ? { ...m, concluida: !m.concluida } : m))
    );
  }

  const pendentes = metas.filter((m) => !m.concluida).length;
  const concluidas = metas.filter((m) => m.concluida).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./assets/splash-icon.png')} style={styles.logo} />
          <Text style={styles.title}>Metas do Semestre</Text>
        </View>

        <Text style={styles.contador}>
          {pendentes} pendentes / {concluidas} concluídas
        </Text>

        <MetaInput value={texto} onChangeText={setTexto} onAdd={handleAdd} />
        <MetaList metas={metas} onDelete={handleDelete} onToggle={handleToggle} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingHorizontal: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 12, marginBottom: 8 },
  logo: { width: 40, height: 40, marginRight: 10, borderRadius: 8 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  contador: { fontSize: 14, color: '#666', marginBottom: 12 },
});