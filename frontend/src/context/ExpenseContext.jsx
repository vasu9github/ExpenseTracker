import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../services/api'; 
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext'; 

const ExpenseContext = createContext();

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload, loading: false, error: null };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [action.payload, ...state.expenses] };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((exp) =>
          exp._id === action.payload._id ? action.payload : exp
        ),
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((exp) => exp._id !== action.payload),
      };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const initialState = {
    expenses: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const { token } = useAuth(); 

  const getExpenses = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const res = await api.get('/expenses');
      dispatch({ type: 'SET_EXPENSES', payload: res.data.data });
    } catch (err) {
      const msg = err.response?.data?.error || 'Could not fetch expenses';
      dispatch({ type: 'SET_ERROR', payload: msg });
      toast.error(msg);
    }
  };
  const addExpense = async (expenseData) => {
    try {
      const res = await api.post('/expenses', expenseData);
      dispatch({ type: 'ADD_EXPENSE', payload: res.data.data });
      toast.success('Expense added!');
    } catch (err) {
      const msg = err.response?.data?.error || 'Could not add expense';
      toast.error(msg);
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      const res = await api.put(`/expenses/${id}`, expenseData);
      dispatch({ type: 'UPDATE_EXPENSE', payload: res.data.data });
      toast.success('Expense updated!');
    } catch (err) {
      const msg = err.response?.data?.error || 'Could not update expense';
      toast.error(msg);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      dispatch({ type: 'DELETE_EXPENSE', payload: id });
      toast.success('Expense deleted!');
    } catch (err) {
      const msg = err.response?.data?.error || 'Could not delete expense';
      toast.error(msg);
    }
  };

  useEffect(() => {
    if (token) {
      getExpenses();
    }
  }, [token]);

  return (
    <ExpenseContext.Provider
      value={{
        ...state,
        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  return useContext(ExpenseContext);
};