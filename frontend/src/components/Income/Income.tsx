import React, { useEffect } from 'react';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import IncomeForm from '../IncomeForm/IncomeForm';
import { IIncomeItemProps } from '../../interfaces/IIncomeItemProps';
import '../../styles/Income.scss';
import Item from '../Item/Item';

const Income: React.FC = () => {
  const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <div className="income">
      <div className="inner-layout">
        <h1>Incomes</h1>
        <h2 className="total-income">
          Total Income: <span>${totalIncome().toFixed(2)}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <IncomeForm />
          </div>
          <div className="incomes">
            {incomes.map((income: IIncomeItemProps) => {
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
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
