import { View, Pressable, Text, StyleSheet } from 'react-native';
import { CATEGORIAS } from '../../constants/categorias';

export default function FiltroCategoria({ selecionada, onSelecionar }) {
  const opcoes = ['Todas', ...CATEGORIAS];

  return (
    <View style={styles.linha}>
      {opcoes.map((cat) => {
        const ativa = (cat === 'Todas' && !selecionada) || cat === selecionada;
        return (
          <Pressable
            key={cat}
            onPress={() => onSelecionar(cat === 'Todas' ? '' : cat)}
            style={[styles.chip, ativa && styles.chipAtivo]}
          >
            <Text style={[styles.texto, ativa && styles.textoAtivo]}>{cat}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, paddingTop: 12, gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: '#e0e0e0' },
  chipAtivo: { backgroundColor: '#3e04c3' },
  texto: { color: '#333' },
  textoAtivo: { color: '#fff', fontWeight: 'bold' },
});