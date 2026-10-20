import { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import { CATEGORIES } from '../constants/categories';
import { getTheme } from '../constants/theme';
import { getDataFormatada } from '../util/data';

// Retorna um objeto { campo: 'mensagem' } só com os campos inválidos
function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }

  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  if (values.date > endOfToday) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }

  return errors;
}

export default function GerenciarDespesa({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const editingExpense = expenses.find((expense) => expense.id === expenseId);
  const colors = getTheme(useColorScheme());

  // estado único do formulário
  const [form, setForm] = useState({
    description: editingExpense?.description ?? '',
    amount: editingExpense ? String(editingExpense.amount) : '',
    date: editingExpense?.date ?? new Date(),
    category: editingExpense?.category ?? '',
  });
  const [errors, setErrors] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Editar despesa' : 'Nova despesa' });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    const updated = { ...form, [field]: value };
    setForm(updated);
    // se já há erros na tela, revalida: as mensagens somem conforme os campos são corrigidos
    if (Object.keys(errors).length > 0) {
      setErrors(validate(updated));
    }
  }

  function handleAmountChange(text) {
    const normalized = text.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalized)) {
      handleChange('amount', normalized);
    }
  }

  function handleDateChange(event, selectedDate) {
    setShowPicker(Platform.OS === 'ios'); // no Android o seletor fecha sozinho
    if (event.type === 'set' && selectedDate) {
      handleChange('date', selectedDate);
    }
  }

  function handleSave() {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return; // bloqueia o salvamento

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) updateExpense(expenseId, data);
    else addExpense(data);

    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert('Excluir despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  // borda vermelha no campo inválido
  const fieldStyle = (field) => [
    styles.input,
    {
      backgroundColor: colors.inputBackground,
      borderColor: errors[field] ? colors.error : colors.border,
    },
  ];

  const renderError = (field) =>
    errors[field] ? <Text style={[styles.error, { color: colors.error }]}>{errors[field]}</Text> : null;

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={[styles.label, { color: colors.text }]}>Descrição</Text>
        <TextInput
          style={[fieldStyle('description'), { color: colors.text }]}
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Ex: Almoço"
          placeholderTextColor={colors.textSecondary}
        />
        {renderError('description')}

        <Text style={[styles.label, { color: colors.text }]}>Valor (R$)</Text>
        <TextInput
          style={[fieldStyle('amount'), { color: colors.text }]}
          value={form.amount}
          onChangeText={handleAmountChange}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={colors.textSecondary}
        />
        {renderError('amount')}

        <Text style={[styles.label, { color: colors.text }]}>Data</Text>
        <Pressable style={fieldStyle('date')} onPress={() => setShowPicker(true)}>
          <Text style={{ color: colors.text }}>{getDataFormatada(form.date)}</Text>
        </Pressable>
        {renderError('date')}
        {showPicker && <DateTimePicker value={form.date} mode="date" onChange={handleDateChange} />}

        <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
        <Pressable
          style={[fieldStyle('category'), styles.selectRow]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: form.category ? colors.text : colors.textSecondary }}>
            {form.category || 'Selecione uma categoria'}
          </Text>
          <Ionicons name="chevron-down" size={18} color={colors.textSecondary} />
        </Pressable>
        {renderError('category')}

        <View style={styles.buttons}>
          <Pressable
            style={[styles.button, { backgroundColor: colors.textSecondary }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSave}>
            <Text style={styles.buttonText}>{isEditing ? 'Atualizar' : 'Salvar'}</Text>
          </Pressable>
        </View>

        {isEditing && (
          <Pressable style={[styles.button, { backgroundColor: colors.error }]} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}> Excluir</Text>
          </Pressable>
        )}
      </ScrollView>

      {/* Modal de categoria: sem digitação livre */}
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={[styles.overlay, { backgroundColor: colors.overlay }]}
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.sheet, { backgroundColor: colors.card }]}>
            <Text style={[styles.sheetTitle, { color: colors.text }]}>Escolha a categoria</Text>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                style={styles.option}
                onPress={() => {
                  handleChange('category', cat);
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: colors.text, fontSize: 16 }}>{cat}</Text>
                {form.category === cat && <Ionicons name="checkmark" size={20} color={colors.primary} />}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 20 },
  label: { fontWeight: 'bold', marginTop: 14, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10 },
  selectRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  error: { fontSize: 12, marginTop: 4 },
  buttons: { flexDirection: 'row', gap: 10, marginTop: 24 },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  sheet: { padding: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  sheetTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
});