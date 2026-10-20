import { useMemo } from 'react';
import { useExpenses } from '../store/expenses-context';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { getDataMinusDias } from '../util/data';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();

  const recentes = useMemo(() => {
    const limite = getDataMinusDias(new Date(), 7);
    return expenses.filter((expense) => expense.date >= limite);
  }, [expenses]);

  return (
    <DespesaSaida
      expenses={recentes}
      periodo="Últimos 7 dias"
      emptyHint="Nenhuma despesa nos últimos 7 dias. Toque em + para adicionar."
    />
  );
}