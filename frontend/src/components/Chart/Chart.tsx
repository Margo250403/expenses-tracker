import React from 'react';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import { dateFormat } from '../..//utils/dateFormat';
import '../../styles/Chart.scss';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

const Chart: React.FC = () => {
    const { incomes, expenses } = useGlobalContext();

    const data = {
        labels: incomes.map((inc) => {
            const { date } = inc;
            return dateFormat(date);
        }),
        datasets: [
            {
                label: 'Income',
                data: incomes.map((income) => income.amount),
                backgroundColor: 'green',
                tension: 0.2,
            },
            {
                label: 'Expenses',
                data: expenses.map((expense) => expense.amount),
                backgroundColor: 'red',
                tension: 0.2,
            },
        ],
    };

    return (
        <div className="chart">
            <Line data={data} />
        </div>
    );
};

export default Chart;
