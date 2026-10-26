import { FlatList, View, Text, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';
import { getTheme } from '../../constants/theme';

export default function DespesaLista({
  expenses,
  emptyHint = 'Toque em + para adicionar uma despesa.',
}) {
  const colors = getTheme(useColorScheme());
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 2 : 1; // bônus: layout responsivo

  return (
    <FlatList
      key={numColumns} // obrigatório ao mudar numColumns
      data={expenses}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <View style={numColumns > 1 && { flex: 1 / numColumns, paddingHorizontal: 4 }}>
          <DespesaItem {...item} />
        </View>
      )}
      contentContainerStyle={expenses.length === 0 && styles.emptyContainer}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="receipt-outline" size={64} color={colors.textSecondary} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Nenhuma despesa</Text>
          <Text style={[styles.emptyHint, { color: colors.textSecondary }]}>{emptyHint}</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
  empty: { alignItems: 'center', padding: 24 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 12 },
  emptyHint: { fontSize: 14, textAlign: 'center', marginTop: 6 },
});