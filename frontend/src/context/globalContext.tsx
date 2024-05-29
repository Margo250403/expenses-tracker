import React, { createContext, useState } from 'react';
import axios from 'axios';
import { IIncomeItemProps } from '../interfaces/IIncomeItemProps';
import { IExpense } from '../interfaces/IExpense';
import { IGlobalContextType } from '../interfaces/IGlobalContextType';
import { IUser } from '../interfaces/IUser';

const BASE_URL = "http://localhost:3000/api/v1/";

export const GlobalContext = createContext<IGlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [incomes, setIncomes] = useState<IIncomeItemProps[]>([]);
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<IUser | null>(null);

    // Income functions
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
    };

    const deleteIncome = async (id: string) => {
        await axios.delete(`${BASE_URL}delete-income/${id}`);
        getIncomes();
    };

    const updateIncome = async (id: string, income: IIncomeItemProps) => {
        try {
            await axios.put(`${BASE_URL}update-income/${id}`, income);
            getIncomes();
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };

    const totalIncome = () => {
        return incomes.reduce((acc, income) => acc + income.amount, 0);
    };

    // Expense functions
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
    };

    const deleteExpense = async (id: string) => {
        await axios.delete(`${BASE_URL}delete-expense/${id}`);
        getExpenses();
    };

    const updateExpense = async (id: string, expense: IExpense) => {
        try {
            await axios.put(`${BASE_URL}update-expense/${id}`, expense);
            getExpenses();
        } catch (err: any) {
            setError(err.response.data.message);
        }
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

    // User functions
    const registerUser = async (userData: { username: string; email: string; password: string }) => {
        try {
            const response = await axios.post(`${BASE_URL}register`, userData);
            setUser(response.data);
            return true;
        } catch (err: any) {
            setError(err.response.data.msg);
            return false;
        }
    };

    const loginUser = async (userData: { email: string; password: string }): Promise<boolean> => {
        try {
          const response = await axios.post(`${BASE_URL}login`, userData);
          setUser(response.data);
          setError(null);  // Очищуємо помилку після успішного логіну
          return true;
        } catch (err: any) {
          setError(err.response.data.msg || 'Невідома помилка');
          return false;
        }
      };

    const getUser = async () => {
        try {
            const response = await axios.get(`${BASE_URL}user`);
            setUser(response.data);
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };

    const logoutUser = async () => {
            try {
                await axios.post(`${BASE_URL}logout`);
                setUser(null);
            } catch (err: any) {
                setError(err.response.data.message);
            }
        };
        
    return (
        <GlobalContext.Provider
            value={{
                addIncome,
                getIncomes,
                incomes,
                deleteIncome,
                updateIncome,
                expenses,
                totalIncome,
                addExpense,
                getExpenses,
                deleteExpense, 
                updateExpense,
                totalExpenses,
                totalBalance,
                transactionHistory,
                error,
                setError,
                user,
                registerUser,
                loginUser,
                getUser,
                logoutUser,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
