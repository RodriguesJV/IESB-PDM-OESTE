import { View, Pressable, Text, StyleSheet, useColorScheme } from 'react-native';
import { CATEGORIES } from '../../constants/categories';
import { getTheme } from '../../constants/theme';

export default function FiltroCategoria({ selected, onSelect }) {
  const colors = getTheme(useColorScheme());
  const options = ['Todas', ...CATEGORIES];

  return (
    <View style={styles.row}>
      {options.map((cat) => {
        const active = (cat === 'Todas' && !selected) || cat === selected;
        return (
          <Pressable
            key={cat}
            onPress={() => onSelect(cat === 'Todas' ? '' : cat)}
            style={[styles.chip, { backgroundColor: active ? colors.primary : colors.chip }]}
          >
            <Text
              style={{
                color: active ? colors.onPrimary : colors.chipText,
                fontWeight: active ? 'bold' : 'normal',
              }}
            >
              {cat}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, paddingTop: 10, gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
});