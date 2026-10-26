import { Pressable, View, Text, StyleSheet, Platform, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFormatada } from '../../util/data';
import { getTheme } from '../../constants/theme';

export default function DespesaItem({ id, description, amount, date, category }) {
  const navigation = useNavigation();
  const colors = getTheme(useColorScheme());

  return (
    <Pressable
      onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: id })}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.item, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.info}>
          <Text style={[styles.description, { color: colors.text }]}>{description}</Text>
          <Text style={[styles.date, { color: colors.textSecondary }]}>{getDataFormatada(date)}</Text>
          <View style={[styles.tag, { backgroundColor: colors.chip }]}>
            <Text style={[styles.tagText, { color: colors.chipText }]}>{category}</Text>
          </View>
        </View>
        <View style={[styles.amountBox, { backgroundColor: colors.summaryBackground }]}>
          <Text style={[styles.amount, { color: colors.summaryText }]}>R$ {amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.7 },
  item: {
    padding: 12,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
    }),
  },
  info: { flex: 1 },
  description: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  date: { marginBottom: 6 },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  tagText: { fontSize: 12, fontWeight: '600' },
  amountBox: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 90,
  },
  amount: { fontWeight: 'bold' },
});