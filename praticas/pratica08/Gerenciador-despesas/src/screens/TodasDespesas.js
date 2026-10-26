import { useContext, useState } from 'react';
import { View } from 'react-native';
import { DespesasContext } from '../store/despesas-context';
import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategoria from '../components/despesa/FiltroCategoria';

// Tarefa 3: função de filtragem com .filter()
function filtrarPorCategoria(despesas, categoria) {
  if (!categoria) return despesas;
  return despesas.filter((despesa) => despesa.categoria === categoria);
}

export default function TodasDespesas() {
  const { despesas } = useContext(DespesasContext);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  const despesasFiltradas = filtrarPorCategoria(despesas, categoriaFiltro);

  return (
    <View style={{ flex: 1 }}>
      <FiltroCategoria selecionada={categoriaFiltro} onSelecionar={setCategoriaFiltro} />
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={categoriaFiltro ? `Total - ${categoriaFiltro}` : 'Total'}
        textoFallback="Nenhuma despesa encontrada."
      />
    </View>
  );
}