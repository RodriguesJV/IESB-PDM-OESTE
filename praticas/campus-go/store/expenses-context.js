import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

// Sempre retorna um NOVO array (sem push, splice ou mutação)
function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id ? { ...expense, ...action.payload.data } : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

const ExpensesContext = createContext(null);

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1) Ao iniciar: carrega do AsyncStorage e dispara SET
  useEffect(() => {
    async function loadExpenses() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          // JSON transforma Date em texto, então convertemos de volta
          const parsed = JSON.parse(stored).map((item) => ({
            ...item,
            date: new Date(item.date),
          }));
          dispatch({ type: 'SET', payload: parsed });
        }
      } catch (error) {
        console.warn('Erro ao carregar despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadExpenses();
  }, []);

  // 2) A cada alteração: salva (só depois de carregar, para não sobrescrever com [])
  useEffect(() => {
    if (!isLoaded) return;

    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.warn('Erro ao salvar despesas:', error);
      }
    }
    saveExpenses();
  }, [expenses, isLoaded]);

  function addExpense(data) {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 8);
    dispatch({ type: 'ADD', payload: { ...data, id } });
  }

  function updateExpense(id, data) {
    dispatch({ type: 'UPDATE', payload: { id, data } });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  // usado pelo bônus "Limpar tudo"
  function clearExpenses() {
    dispatch({ type: 'SET', payload: [] });
  }

  const value = { expenses, addExpense, updateExpense, deleteExpense, clearExpenses };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider.');
  }
  return context;
}