import React, { useEffect } from 'react';
import { useGlobalContext } from '../../hooks/useGlobalContext';
import Chart from '../Chart/Chart';
import '../../styles/Dashboard.scss';
import '../../styles/Layouts.scss';
import History from '../History/History';

const Dashboard: React.FC = () => {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <div className="dashboard">
            <div className="inner-layout">
                <h1>Усі транзакції</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Загальний дохід</h2>
                                <p>
                                    ₴ {totalIncome().toFixed(2)}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Загальні витрати</h2>
                                <p>
                                    ₴ {totalExpenses().toFixed(2)}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Загальний баланс</h2>
                                <p>
                                    ₴ {totalBalance().toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Дохід</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                ₴ {Math.min(...incomes.map(item => item.amount))}
                            </p>
                            <p>
                                ₴ {Math.max(...incomes.map(item => item.amount))}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Витрати</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                ₴ {Math.min(...expenses.map(item => item.amount))}
                            </p>
                            <p>
                                ₴ {Math.max(...expenses.map(item => item.amount))}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
