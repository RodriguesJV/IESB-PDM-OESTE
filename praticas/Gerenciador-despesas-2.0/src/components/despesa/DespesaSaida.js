import { View, StyleSheet, useColorScheme } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';
import { getTheme } from '../../constants/theme';

export default function DespesaSaida({ expenses, periodo, emptyHint }) {
  const colors = getTheme(useColorScheme());

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <DespesaSumario expenses={expenses} periodo={periodo} />
      <DespesaLista expenses={expenses} emptyHint={emptyHint} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
});