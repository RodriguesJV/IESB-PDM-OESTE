import { useContext } from 'react';
import { DespesasContext } from '../store/despesas-context';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { getDataMinusDias } from '../util/data';

export default function DespesasRecentes() {
  const { despesas } = useContext(DespesasContext);

  const seteDiasAtras = getDataMinusDias(new Date(), 7);
  const recentes = despesas.filter((d) => d.data >= seteDiasAtras);

  return (
    <DespesaSaida
      despesas={recentes}
      periodo="Últimos 7 dias"
      textoFallback="Nenhuma despesa nos últimos 7 dias."
    />
  );
}