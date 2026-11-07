import { createContext, useState } from 'react';
import { getDataMinusDias } from '../util/data';

const hoje = new Date();

const DESPESAS_INICIAIS = [
  { id: 'e1', descricao: 'Supermercado', valor: 89.9, data: getDataMinusDias(hoje, 1), categoria: 'Alimentação' },
  { id: 'e2', descricao: 'Uber', valor: 32.5, data: getDataMinusDias(hoje, 3), categoria: 'Transporte' },
  { id: 'e3', descricao: 'Cinema', valor: 45, data: getDataMinusDias(hoje, 5), categoria: 'Lazer' },
  { id: 'e4', descricao: 'Conta de luz', valor: 150.75, data: getDataMinusDias(hoje, 10), categoria: 'Contas' },
  { id: 'e5', descricao: 'Restaurante', valor: 72.3, data: getDataMinusDias(hoje, 20), categoria: 'Alimentação' },
];

export const DespesasContext = createContext({
  despesas: [],
  addDespesa: () => {},
  updateDespesa: () => {},
  deleteDespesa: () => {},
});

export default function DespesasProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function addDespesa(dados) {
    const id = new Date().getTime().toString() + Math.random().toString();
    setDespesas((atual) => [{ ...dados, id }, ...atual]);
  }

  function updateDespesa(id, dados) {
    setDespesas((atual) => atual.map((d) => (d.id === id ? { ...d, ...dados } : d)));
  }

  function deleteDespesa(id) {
    setDespesas((atual) => atual.filter((d) => d.id !== id));
  }

  return (
    <DespesasContext.Provider value={{ despesas, addDespesa, updateDespesa, deleteDespesa }}>
      {children}
    </DespesasContext.Provider>
  );
}