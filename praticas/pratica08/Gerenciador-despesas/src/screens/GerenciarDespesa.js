import { useContext, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DespesasContext } from '../store/despesas-context';
import { CATEGORIAS } from '../constants/categorias';
import { getDataFormatada } from '../util/data';

export default function GerenciarDespesa({ route, navigation }) {
  const despesaId = route.params?.despesaId;
  const editando = !!despesaId;

  const { despesas, addDespesa, updateDespesa, deleteDespesa } = useContext(DespesasContext);
  const despesaEditada = despesas.find((d) => d.id === despesaId);

  const [descricao, setDescricao] = useState(despesaEditada?.descricao ?? '');
  const [valor, setValor] = useState(despesaEditada ? despesaEditada.valor.toString() : '');
  const [data, setData] = useState(despesaEditada?.data ?? new Date());
  const [categoria, setCategoria] = useState(despesaEditada?.categoria ?? '');
  const [mostrarPicker, setMostrarPicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: editando ? 'Editar Despesa' : 'Nova Despesa' });
  }, [navigation, editando]);

  // Regex: só números com no máximo 2 casas decimais
  function tratarValor(texto) {
    const normalizado = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalizado)) {
      setValor(normalizado);
    }
  }

  function aoMudarData(event, dataSelecionada) {
    setMostrarPicker(Platform.OS === 'ios'); // fecha no Android
    if (event.type === 'set' && dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function confirmar() {
    const valorNumero = parseFloat(valor);

    if (descricao.trim().length === 0 || !valor || isNaN(valorNumero) || valorNumero <= 0 || !categoria) {
      Alert.alert('Dados inválidos', 'Preencha descrição, valor (maior que zero) e categoria.');
      return;
    }

    const dados = { descricao: descricao.trim(), valor: valorNumero, data, categoria };

    if (editando) updateDespesa(despesaId, dados);
    else addDespesa(dados);

    navigation.goBack();
  }

  function excluir() {
    deleteDespesa(despesaId);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} placeholder="Ex: Almoço" />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={tratarValor}
        keyboardType="decimal-pad"
        placeholder="0.00"
      />

      <Text style={styles.label}>Data</Text>
      <Pressable style={styles.input} onPress={() => setMostrarPicker(true)}>
        <Text>{getDataFormatada(data)}</Text>
      </Pressable>
      {mostrarPicker && (
        <DateTimePicker value={data} mode="date" maximumDate={new Date()} onChange={aoMudarData} />
      )}

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setCategoria(cat)}
            style={[styles.chip, categoria === cat && styles.chipAtivo]}
          >
            <Text style={[styles.chipTexto, categoria === cat && styles.chipTextoAtivo]}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.botoes}>
        <Pressable style={[styles.botao, styles.cancelar]} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoTexto}>Cancelar</Text>
        </Pressable>
        <Pressable style={[styles.botao, styles.salvar]} onPress={confirmar}>
          <Text style={styles.botaoTexto}>{editando ? 'Atualizar' : 'Adicionar'}</Text>
        </Pressable>
      </View>

      {editando && (
        <Pressable style={[styles.botao, styles.excluir]} onPress={excluir}>
          <Text style={styles.botaoTexto}>Excluir</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: 'bold', marginTop: 14, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, backgroundColor: '#fff' },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, backgroundColor: '#e0e0e0' },
  chipAtivo: { backgroundColor: '#3e04c3' },
  chipTexto: { color: '#333' },
  chipTextoAtivo: { color: '#fff', fontWeight: 'bold' },
  botoes: { flexDirection: 'row', gap: 10, marginTop: 24 },
  botao: { flex: 1, padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 8 },
  cancelar: { backgroundColor: '#888' },
  salvar: { backgroundColor: '#3e04c3' },
  excluir: { backgroundColor: '#c0392b' },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});