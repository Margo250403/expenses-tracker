import { IMenuItem } from '../interfaces/IMenuItem';
import { dashboard, expenses, trend, transactions } from './icons';

export const menuItems: IMenuItem[] = [
    {
        id: 1,
        title: 'Приборная панель',
        icon: dashboard,
        link: '/dashboard',
    },
    // {
    //     id: 2,
    //     title: "View Transactions",
    //     icon: transactions,
    //     link: "/dashboard",
    // },
    {
        id: 3,
        title: "Доходи",
        icon: trend,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Витрати",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 2,
        title: "Категорії",
        icon: transactions,
        link: "/dashboard",
    },

];
