import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../hooks/useGlobalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/icons';
import '../../styles/ExpensesForm.scss';
import { IInputState } from '../../interfaces/IInputState';
import { IExpense } from '../../interfaces/IExpense';

const ExpensesForm: React.FC = () => {
    const { addExpense, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState<IInputState>({
        title: '',
        amount: '',
        date: null,
        category: '',
        description: '',
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = (name: keyof IInputState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (date) {
            const excomeData: IExpense = {
                _id: '', 
                title,
                amount: parseFloat(amount),
                date,
                category,
                description,
                type: '', 
                createdAt: new Date(),
            };
            addExpense(excomeData);
            setInputState({
                title: '',
                amount: '',
                date: null,
                category: '',
                description: '',
            });
        } else {
            setError('Оберіть дату');
        }

    };

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            {error && <p className="error-expense">{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Назва витрати"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="text"
                    name={'amount'}
                    placeholder={'Сума витрати'}
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Введіть дату'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date: Date | null) => {
                        setInputState({ ...inputState, date });
                    }}
                />
            </div>
            <div className={`${"selects"} ${"input-control"}`}>
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Виберіть опцію</option>
                    <option value="education">Навчання</option>
                    <option value="groceries">Продукти</option>
                    <option value="health">Здоров'я</option>
                    <option value="subscriptions">Підписки</option>
                    <option value="takeaways">Кафе та ресторани</option>
                    <option value="clothing">Одяг</option>
                    <option value="travelling">Подорожі</option>
                    <option value="other">Інше</option>
                </select>
            </div>
            <div className="input-control">
                <textarea
                    name="description"
                    value={description}
                    placeholder='Додайте опис'
                    id="description"
                    cols={30}
                    rows={4}
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="submitBtn">
                <Button
                    name={'Додати витрату'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </form>
    );
};

export default ExpensesForm;
