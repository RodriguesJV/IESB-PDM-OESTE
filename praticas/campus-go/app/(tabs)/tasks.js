import { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function Tasks() {
  const router = useRouter();
  const [place, setPlace] = useState(null);

  async function handleCheckIn() {
    try {
      const result = await getCurrentPlace();
      if (!result) {
        Alert.alert(
          'Sem permissão',
          'Não foi possível acessar sua localização. Libere a permissão nos ajustes para fazer o check-in.'
        );
        return;
      }
      setPlace(result);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    }
  }

  async function handleReminder() {
    try {
      const ok = await scheduleReminder('Hora de estudar!', 10);
      if (!ok) {
        Alert.alert('Sem permissão', 'Libere as notificações nos ajustes para receber o lembrete.');
        return;
      }
      Alert.alert('Lembrete agendado', 'Você será avisado em 10 segundos.');
    } catch (error) {
        console.warn('Erro no lembrete:', error);
        Alert.alert('Erro', String(error?.message ?? error));
    }
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.warn('Vibração indisponível:', error);
    }
    Alert.alert('Tarefa concluída');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <Link href="/new-task" style={styles.link}>Nova tarefa (Link)</Link>
      <Button title="Nova tarefa (router.push)" onPress={() => router.push('/new-task')} />
      <Button title="Abrir tarefa 42" onPress={() => router.push('/task/42')} />

      <Button title="Estudei aqui" onPress={handleCheckIn} />
      {place && <Text style={styles.place}>📍 {place.label}</Text>}

      <Button title="Lembrar em 10 s" onPress={handleReminder} />
      <Button title="Concluir" onPress={handleComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  link: { color: '#2563eb', fontSize: 16 },
  place: { fontSize: 16, marginTop: 8 },
});