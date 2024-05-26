import { IExpense } from '../interfaces/IExpense';
import { IIncomeItemProps } from '../interfaces/IIncomeItemProps';
import { IUser } from '../interfaces/IUser';

export interface IGlobalContextType {
  incomes: IIncomeItemProps[];
  expenses: IExpense[];
  addIncome: (income: IIncomeItemProps) => Promise<void>;
  getIncomes: () => Promise<void>;
  deleteIncome: (id: string) => Promise<void>;
  updateIncome: (id: string, income: IIncomeItemProps) => Promise<void>;
  totalIncome: () => number;
  addExpense: (expense: IExpense) => Promise<void>;
  getExpenses: () => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  updateExpense: (id: string, expense: IExpense) => Promise<void>;
  totalExpenses: () => number;
  totalBalance: () => number;
  transactionHistory: () => (IIncomeItemProps | IExpense)[];
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  user: IUser | null;
  registerUser: (userData: { username: string; email: string; password: string }) => Promise<boolean>;
  loginUser: (userData: { email: string; password: string }) => Promise<boolean>;
  getUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
}
