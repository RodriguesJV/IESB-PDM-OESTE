import { View, Text, StyleSheet } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

export default function DespesaSaida({ despesas, periodo, textoFallback }) {
  let conteudo = <Text style={styles.fallback}>{textoFallback}</Text>;

  if (despesas.length > 0) {
    conteudo = <DespesaLista despesas={despesas} />;
  }

  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      {conteudo}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  fallback: { color: '#555', fontSize: 16, textAlign: 'center', marginTop: 32 },
});