import { useMemo, useState } from 'react';
import { View, TextInput, Pressable, Alert, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import useDebounce from '../hooks/useDebounce';
import { getTheme } from '../constants/theme';
import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategoria from '../components/despesa/FiltroCategoria';

export default function TodasDespesas() {
  const { expenses, clearExpenses } = useExpenses();
  const colors = getTheme(useColorScheme());

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  // .filter() por busca (sem diferenciar maiúsculas) + categoria
  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    return expenses.filter(
      (expense) =>
        (!category || expense.category === category) &&
        expense.description.toLowerCase().includes(term)
    );
  }, [expenses, debouncedSearch, category]);

  function handleClearAll() {
    Alert.alert('Limpar tudo', 'Deseja remover todas as despesas?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Limpar', style: 'destructive', onPress: clearExpenses },
    ]);
  }

  const emptyHint =
    expenses.length === 0
      ? 'Toque em + para adicionar uma despesa.'
      : 'Nenhuma despesa corresponde à busca ou ao filtro.';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.searchRow}>
        <TextInput
          style={[
            styles.search,
            { backgroundColor: colors.inputBackground, borderColor: colors.border, color: colors.text },
          ]}
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por descrição"
          placeholderTextColor={colors.textSecondary}
        />
        {expenses.length > 0 && (
          <Pressable onPress={handleClearAll} hitSlop={8}>
            <Ionicons name="trash-outline" size={24} color={colors.error} />
          </Pressable>
        )}
      </View>

      <FiltroCategoria selected={category} onSelect={setCategory} />

      <DespesaSaida
        expenses={filtered}
        periodo={category ? `Total - ${category}` : 'Total'}
        emptyHint={emptyHint}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  search: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 10 },
});