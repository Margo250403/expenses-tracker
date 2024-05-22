export interface IIncomeItemProps {
    _id: string;
    title: string;
    amount: number;
    date: Date;
    category: string;
    description: string;
    deleteItem: (id: string) => void;
    indicatorColor: string;
    type: string;
    createdAt: Date;
  }
  