import React, { useEffect } from 'react';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import  '../../styles/Layouts.scss';
import ExpenseForm from '../ExpensesForm/ExpensesForm';
import '../../styles/Expenses.scss';
import Item from '../Item/Item';

const Expenses: React.FC = () => {
  const { addExpense, expenses, updateExpense, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className="expense">
      <div className='inner-layout'>
        <h1>Expenses</h1>
        <h2 className="total-expense">
          Total Expense: <span>${totalExpenses().toFixed(2)}</span>
        </h2>
        <div className="expense-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="expenses">
            {expenses.map((income) => {
              const { _id, title, amount, date, category, description, type } = income;
              return (
                <Item
                  key={_id}
                  _id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  createdAt={date}
                  category={category}
                  indicatorColor="var(--color-delete)"
                  deleteItem={deleteExpense}
                  // updateItem={updateExpense}
                />
              );
            })}
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Expenses;
