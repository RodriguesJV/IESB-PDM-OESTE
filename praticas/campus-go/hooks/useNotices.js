import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

const AVISOS = [
  { title: 'Reunião do centro acadêmico', body: 'Quinta-feira, às 19h, na sala 204. Todos os alunos estão convidados.' },
  { title: 'Inscrições abertas para monitoria', body: 'Envie seu nome e a disciplina de interesse até sexta-feira.' },
  { title: 'Biblioteca com novo horário', body: 'A partir de segunda, a biblioteca abre das 8h às 22h.' },
  { title: 'Prova de Programação Móvel', body: 'A avaliação será na próxima terça. Revise Expo Router e recursos nativos.' },
  { title: 'Palestra de carreira em TI', body: 'Profissionais do mercado falam sobre estágio e primeiro emprego. Entrada gratuita.' },
  { title: 'Manutenção do laboratório 3', body: 'O laboratório ficará fechado na quarta-feira para atualização dos computadores.' },
  { title: 'Entrega do CampusGo', body: 'Lembre de abrir o pull request com os prints e o .env.example.' },
  { title: 'Feira de projetos', body: 'Prepare uma demonstração de 5 minutos do seu aplicativo.' },
  { title: 'Wi-Fi do campus', body: 'A rede foi renovada. Use seu e-mail institucional para conectar.' },
  { title: 'Resultado das notas parciais', body: 'As notas já estão disponíveis no portal do aluno.' },
];

export function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.get('posts?_limit=10');
      // A API fornece id e quantidade; o texto é exibido em português
      const traduzidos = data.map((post, index) => ({
        ...post,
        title: AVISOS[index % AVISOS.length].title,
        body: AVISOS[index % AVISOS.length].body,
      }));
      setNotices(traduzidos);
    } catch (err) {
      setError(err.message || 'Não foi possível carregar os avisos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { notices, isLoading, error, reload };
}