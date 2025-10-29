import React from 'react';
import { useExpenses } from '../context/ExpenseContext';

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.064 0a48.108 48.108 0 01-3.478-.397m15.54 0v-2.19c0-.621-.504-1.125-1.125-1.125H9.797c-.621 0-1.125.504-1.125 1.125v2.19m15.54 0A48.067 48.067 0 0112 5.25c-2.618 0-5.066.44-7.37.954m14.74 0" />
  </svg>
);


const ExpenseItem = ({ expense, setExpenseToEdit }) => {
  const { deleteExpense } = useExpenses();
  const { _id, title, amount, category, date } = expense;
  
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <li className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">
          {category} &bull; {formattedDate}
        </p>
      </div>
      
      <div className="flex items-center space-x-3">
        <span className="text-lg font-medium text-red-600">
          -${amount.toFixed(2)}
        </span>
        <button 
          onClick={() => setExpenseToEdit(expense)}
          className="text-gray-400 hover:text-blue-600"
          aria-label="Edit expense"
        >
          <EditIcon />
        </button>
        <button 
          onClick={() => deleteExpense(_id)}
          className="text-gray-400 hover:text-red-600"
          aria-label="Delete expense"
        >
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;