// components/CompromissoList.js
// Aula 05/06: componentização + props + FlatList + remoção
// Recebe: itens, onDelete, tituloLista, listaVazia

import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";

function CompromissoItem({ item, onDelete }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.itemPressionado]}
      android_ripple={{ color: "#fecaca" }}
      onPress={() => onDelete(item.id)}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTexto}>{item.texto}</Text>
        <Text style={styles.itemData}>
          Criado em: {new Date(Number(item.criadoEm)).toLocaleString()}
        </Text>
      </View>
      <Text style={styles.remover}>Remover</Text>
    </Pressable>
  );
}

export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      {itens.length === 0 ? (
        <Text style={styles.vazio}>{listaVazia}</Text>
      ) : (
        <FlatList
          data={itens}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CompromissoItem item={item} onDelete={onDelete} />
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1e293b",
  },
  vazio: {
    color: "#94a3b8",
    fontStyle: "italic",
    marginTop: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  itemPressionado: {
    opacity: 0.6,
  },
  itemTexto: {
    fontSize: 15,
    color: "#0f172a",
  },
  itemData: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 2,
  },
  remover: {
    color: "#dc2626",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 8,
  },
});
