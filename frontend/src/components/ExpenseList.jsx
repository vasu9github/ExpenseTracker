import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ setExpenseToEdit }) => {
  const { expenses, loading, error } = useExpenses();

  if (loading) {
    return <div className="bg-white p-6 rounded-lg shadow-md text-center">Loading...</div>;
  }

  if (error) {
    return <div className="bg-white p-6 rounded-lg shadow-md text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Expense History
      </h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses found. Add one to get started!</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <ExpenseItem 
              key={expense._id} 
              expense={expense}
              setExpenseToEdit={setExpenseToEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;