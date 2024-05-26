import { IExpense } from "./IExpense";

export interface IIncomeItemProps {
    _id: string;
    title: string;
    amount: number;
    date: Date;
    category: string;
    description: string;
    deleteItem: (id: string) => void;
    updatedExpense: (id: string, updatedExpense: IExpense) => void;
    indicatorColor: string;
    type: string;
    createdAt: Date;
  }
  