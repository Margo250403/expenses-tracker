import { IExpense } from './IExpense';
// import { IIncome } from './IIncome';
import { IIncomeItemProps } from './IIncomeItemProps';

export interface IGlobalContextType {
  addIncome: (income: IIncomeItemProps) => void;
  getIncomes: () => void;
  incomes: IIncomeItemProps[];
  deleteIncome: (id: string) => void;
  expenses: IExpense[];
  totalIncome: () => number;
  addExpense: (expense: IExpense) => void;
  getExpenses: () => void;
  deleteExpense: (id: string) => void;
  totalExpenses: () => number;
  totalBalance: () => number;
  transactionHistory: () => (IIncomeItemProps | IExpense)[];
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}
