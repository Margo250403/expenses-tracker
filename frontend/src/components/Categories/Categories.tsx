import React, { useEffect, useContext } from 'react';
import '../../styles/Categories.scss';
import { GlobalContext } from '../../context/globalContext';
import { book, food, medical, tv, takeaway, clothing, freelance, money, stocks, bitcoin, cardIcon } from '../../utils/icons';

const Categories: React.FC = () => {
  const context = useContext(GlobalContext);

  useEffect(() => {
    if (context) {
      context.getExpenses();
      context.getIncomes();
    }
  }, []);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { expenses, incomes } = context;

  const categoryTranslations: Record<string, string> = {
    education: 'Навчання',
    groceries: 'Продукти',
    health: 'Здоров\'я',
    subscriptions: 'Підписки',
    takeaways: 'Кафе та ресторани',
    clothing: 'Одяг',
    travelling: 'Подорожі',
    other: 'Інше',
    salary: 'Заробітна плата',
    freelancing: 'Фріланс',
    investments: 'Інвестиції',
    stocks: 'Акції',
    bitcoin: 'Біткойн',
    bank: 'Банківський переказ',
    scholarship: 'Стипендія'
  };

  const categoryIcons: Record<string, JSX.Element> = {
    education: book,
    groceries: food,
    health: medical,
    subscriptions: tv,
    takeaways: takeaway,
    clothing: clothing,
    travelling: freelance,
    other: clothing,
    salary: money,
    freelancing: freelance,
    investments: stocks,
    stocks: stocks,
    bitcoin: bitcoin,
    bank: cardIcon,
    scholarship: freelance
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const totalIncomes = incomes.reduce((total, income) => total + income.amount, 0);

  const categorizedExpenses = expenses.reduce<Record<string, typeof expenses>>((acc, expense) => {
    const { category } = expense;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(expense);
    return acc;
  }, {});

  const categorizedIncomes = incomes.reduce<Record<string, typeof incomes>>((acc, income) => {
    const { category } = income;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(income);
    return acc;
  }, {});

  return (
    <div className="categories">
      <h1>Категорії витрат та доходів</h1>
      <div className="category-section">
        <h2>Витрати</h2>
        {Object.keys(categorizedExpenses).map((category) => (
          <div key={category} className="category-block expense-block">
            <h3>{categoryTranslations[category] || category}</h3>
            <ul>
              {categorizedExpenses[category].map((expense) => (
                <li key={expense._id}>
                  <span>{categoryIcons[category]}</span>
                  <span>{expense.title}</span> - <span>{expense.amount}</span> грн
                </li>
              ))}
            </ul>
            <div className="category-percentage">
              Відсоток: {((categorizedExpenses[category].reduce((total, item) => total + item.amount, 0) / totalExpenses) * 100).toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
      <div className="category-section">
        <h2>Доходи</h2>
        {Object.keys(categorizedIncomes).map((category) => (
          <div key={category} className="category-block income-block">
            <h3>{categoryTranslations[category] || category}</h3>
            <ul>
              {categorizedIncomes[category].map((income) => (
                <li key={income._id}>
                  <span>{categoryIcons[category]}</span>
                  <span>{income.title}</span> - <span>{income.amount}</span> грн
                </li>
              ))}
            </ul>
            <div className="category-percentage">
              Відсоток: {((categorizedIncomes[category].reduce((total, item) => total + item.amount, 0) / totalIncomes) * 100).toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
