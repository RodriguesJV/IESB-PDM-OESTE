import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { useNotices } from '../../hooks/useNotices';
import FadeIn from '../../components/FadeIn';

export default function Home() {
  const { notices, isLoading, error, reload } = useNotices();

  if (isLoading && notices.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.hint}>Carregando avisos...</Text>
      </View>
    );
  }

  if (error && notices.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Tentar novamente" onPress={reload} />
      </View>
    );
  }

  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      refreshing={isLoading}
      onRefresh={reload}
      ListEmptyComponent={<Text style={styles.hint}>Nenhum aviso por enquanto.</Text>}
      renderItem={({ item }) => (
        <FadeIn style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  hint: { color: '#666', textAlign: 'center' },
  error: { color: '#b91c1c', fontSize: 16, textAlign: 'center' },
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 14, elevation: 2 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  body: { color: '#444' },
});