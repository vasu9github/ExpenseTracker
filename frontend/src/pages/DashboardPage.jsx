import React, { useState } from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Summary from '../components/Summary';

const DashboardPage = () => {
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />
      
      <main className="max-w-7xl mx-auto p-4 md:p-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1 space-y-8">
            <ExpenseForm 
              expenseToEdit={expenseToEdit}
              setExpenseToEdit={setExpenseToEdit}
            />
            <Summary />
          </div>
          
          <div className="lg:col-span-2">
            <ExpenseList setExpenseToEdit={setExpenseToEdit} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;