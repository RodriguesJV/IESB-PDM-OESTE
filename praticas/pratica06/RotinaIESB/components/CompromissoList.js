import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";


function CompromissoItem({ item, onDelete, onToggle }) {
  return (
    <View style={styles.item}>
      <Pressable
        style={styles.checkArea}
        android_ripple={{ color: "#dbeafe" }}
        onPress={() => onToggle(item.id)}
      >
        <Text style={styles.checkbox}>{item.concluido ? "☑" : "☐"}</Text>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.itemTexto,
              item.concluido && styles.itemTextoConcluido,
            ]}
          >
            {item.texto}
          </Text>
          <Text style={styles.itemData}>
            Criado em: {new Date(Number(item.criadoEm)).toLocaleString()}
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.removerBtn,
          pressed && styles.itemPressionado,
        ]}
        android_ripple={{ color: "#fecaca" }}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.remover}>Remover</Text>
      </Pressable>
    </View>
  );
}

export default function CompromissoList({
  itens,
  onDelete,
  onToggle,
  tituloLista,
  listaVazia,
}) {
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
            <CompromissoItem item={item} onDelete={onDelete} onToggle={onToggle} />
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
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  checkArea: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 8,
    color: "#2563eb",
  },
  itemPressionado: {
    opacity: 0.6,
  },
  itemTexto: {
    fontSize: 15,
    color: "#0f172a",
  },
  itemTextoConcluido: {
    textDecorationLine: "line-through",
    color: "#94a3b8",
  },
  itemData: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 2,
  },
  removerBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  remover: {
    color: "#dc2626",
    fontSize: 12,
    fontWeight: "600",
  },
});