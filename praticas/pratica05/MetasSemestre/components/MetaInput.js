import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova meta..."
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
      />
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        android_ripple={{ color: '#ccc' }}
        onPress={onAdd}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginBottom: 16 },
  input: {
    flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#fff', marginRight: 8,
  },
  button: {
    backgroundColor: '#4a90e2', borderRadius: 8, width: 44,
    justifyContent: 'center', alignItems: 'center',
  },
  buttonPressed: { opacity: 0.7 },
  buttonText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
});