import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { IIncomeItemProps } from "../interfaces/IIncomeItemProps";
import { IExpense } from "../interfaces/IExpense";
import { IGlobalContextType } from "../interfaces/IGlobalContextType";


const BASE_URL = "http://localhost:3000/api/v1/";

export const GlobalContext = createContext<IGlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [incomes, setIncomes] = useState<IIncomeItemProps[]>([]);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addIncome = async (income: IIncomeItemProps) => {
    try {
      await axios.post(`${BASE_URL}add-income`, income);
      getIncomes();
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`);
    setIncomes(response.data);
    console.log(response.data);
  };

  const deleteIncome = async (id: string) => {
    await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncomes();
  };

  const totalIncome = () => {
    return incomes.reduce((acc, income) => acc + income.amount, 0);
  };

  const addExpense = async (expense: IExpense) => {
    try {
      await axios.post(`${BASE_URL}add-expense`, expense);
      getExpenses();
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`);
    setExpenses(response.data);
    console.log(response.data);
  };

  const deleteExpense = async (id: string) => {
    await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses();
  };

  const totalExpenses = () => {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

