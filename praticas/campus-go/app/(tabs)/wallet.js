import { View, Text, Button, Share, StyleSheet } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function Wallet() {
  const { expenses, addExpense } = useExpenses();

  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const totalFormatado = total.toFixed(2);

  async function handleShare() {
    try {
      await Share.share({
        message: `Gastei R$ ${totalFormatado} neste semestre.`,
      });
    } catch (error) {
      console.warn('Erro ao compartilhar:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total gasto</Text>
      <Text style={styles.total}>R$ {totalFormatado}</Text>

      
     

      <Button title="Compartilhar resumo" onPress={handleShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  label: { fontSize: 16, color: '#666' },
  total: { fontSize: 36, fontWeight: 'bold' },
});