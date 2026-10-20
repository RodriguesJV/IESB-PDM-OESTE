import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { getTheme } from '../../constants/theme';

export default function DespesaSumario({ expenses, periodo }) {
  const colors = getTheme(useColorScheme());

  const total = expenses.reduce((acumulador, item) => acumulador + item.amount, 0);
  const quantidade = expenses.length;

  return (
    <View style={[styles.container, { backgroundColor: colors.summaryBackground }]}>
      <View>
        <Text style={[styles.periodo, { color: colors.summaryText }]}>{periodo}</Text>
        <Text style={[styles.quantidade, { color: colors.textSecondary }]}>
          {quantidade} {quantidade === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text style={[styles.total, { color: total > 200 ? colors.error : colors.success }]}>
        R$ {total.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodo: { fontSize: 13, fontWeight: '600' },
  quantidade: { fontSize: 12, marginTop: 2 },
  total: { fontSize: 18, fontWeight: 'bold' },
});