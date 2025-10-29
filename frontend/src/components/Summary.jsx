import React, { useMemo } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import ExpenseChart from './ExpenseChart'; 

const Summary = () => {
  const { expenses } = useExpenses();

  const { total, categoryData } = useMemo(() => {
    const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    
    const categorySummary = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    
    const categoryData = Object.entries(categorySummary).map(([name, value]) => ({
      name,
      value,
    }));
    
    return { total, categoryData };
  }, [expenses]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">

      <div>
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Total Expenses
        </h3>
        <p className="text-3xl font-bold text-gray-900">
          ${total.toFixed(2)}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          By Category
        </h3>
        <ExpenseChart data={categoryData} />
      </div>
    </div>
  );
};

export default Summary;