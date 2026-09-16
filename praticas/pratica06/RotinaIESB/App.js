import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert, StyleSheet } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { tituloApp, tituloLista, listaVazia, placeholderCompromisso, botaoAdicionar } from "./labels";
import CompromissoInput from "./components/CompromissoInput";
import CompromissoList from "./components/CompromissoList";

const STORAGE_KEY = "@rotina_iesb_compromissos";

const labels = {
  tituloApp,
  tituloLista,
  listaVazia,
  placeholderCompromisso,
  botaoAdicionar,
};

export default function App() {
  const [texto, setTexto] = useState("");
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // useEffect (montagem) — CARREGAR a lista salva
  useEffect(() => {
    async function carregar() {
      try {
        const salvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (salvos) {
          setCompromissos(JSON.parse(salvos));
        }
      } catch (erro) {
        Alert.alert("Erro", "Não foi possível carregar seus compromissos.");
      } finally {
        setCarregado(true);
      }
    }
    carregar();
  }, []);

  // useEffect (dependência da lista) — SALVAR sempre que compromissos mudar
  useEffect(() => {
    if (!carregado) return; // evita sobrescrever no primeiro render
    async function salvar() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        Alert.alert("Erro", "Não foi possível salvar seus compromissos.");
      }
    }
    salvar();
  }, [compromissos, carregado]);

  function handleAdicionar() {
    if (texto.trim().length === 0) {
      Alert.alert("Atenção", "Digite um compromisso antes de adicionar.");
      return;
    }
    const novoCompromisso = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadoEm: Date.now().toString(),
      concluido: false, // desafio opcional O2
    };
    setCompromissos((atual) => [novoCompromisso, ...atual]);
    setTexto("");
  }

  function handleRemover(id) {
    setCompromissos((atual) => atual.filter((item) => item.id !== id));
  }

  // Desafio opcional O2: alterna concluido no compromisso pelo id
  function handleToggle(id) {
    setCompromissos((atual) =>
      atual.map((item) =>
        item.id === id ? { ...item, concluido: !item.concluido } : item
      )
    );
  }

  // Desafio opcional O3: contador de pendentes no cabeçalho
  const pendentes = compromissos.filter((item) => !item.concluido).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={require("./assets/logo.png")} style={styles.logo} />
            <Text style={styles.headerTitulo}>{labels.tituloApp}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeTexto}>{pendentes} pendentes</Text>
          </View>
        </View>

        <CompromissoInput
          value={texto}
          onChangeText={setTexto}
          onAdd={handleAdicionar}
          labels={labels}
        />

        <CompromissoList
          itens={compromissos}
          onDelete={handleRemover}
          onToggle={handleToggle}
          tituloLista={labels.tituloLista}
          listaVazia={labels.listaVazia}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerTitulo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
  },
  badge: {
    backgroundColor: "#eff6ff",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  badgeTexto: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2563eb",
  },
});