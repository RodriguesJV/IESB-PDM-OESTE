import React from 'react';
import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';

export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhuma meta cadastrada ainda.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Pressable style={styles.textoContainer} onPress={() => onToggle(item.id)}>
            <Text style={[styles.itemTexto, item.concluida && styles.itemConcluida]}>
              {item.texto}
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.deleteButton, pressed && styles.deleteButtonPressed]}
            android_ripple={{ color: '#f5c6c6' }}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.deleteButtonText}>✕</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: { marginTop: 40, alignItems: 'center' },
  emptyText: { color: '#999', fontSize: 16 },
  item: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    padding: 12, borderRadius: 8, marginBottom: 8,
  },
  textoContainer: { flex: 1 },
  itemTexto: { fontSize: 16, color: '#222' },
  itemConcluida: { textDecorationLine: 'line-through', color: '#999' },
  deleteButton: {
    backgroundColor: '#e74c3c', borderRadius: 6, width: 32, height: 32,
    justifyContent: 'center', alignItems: 'center', marginLeft: 8,
  },
  deleteButtonPressed: { opacity: 0.7 },
  deleteButtonText: { color: '#fff', fontWeight: 'bold' },
});