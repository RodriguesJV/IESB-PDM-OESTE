import { View, Text, Button, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function Tasks() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <Link href="/new-task" style={styles.link}>Nova tarefa (Link)</Link>
      <Button title="Nova tarefa (router.push)" onPress={() => router.push('/new-task')} />
      <Button title="Abrir tarefa 42" onPress={() => router.push('/task/42')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  link: { color: '#2563eb', fontSize: 16 },
});