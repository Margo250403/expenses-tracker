import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../hooks/useGlobalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/icons';
import '../../styles/IncomeForm.scss';
import { IInputState } from '../../interfaces/IInputState';
import { IIncomeItemProps } from '../../interfaces/IIncomeItemProps';

const IncomeForm: React.FC = () => {
    const { addIncome, error, setError } = useGlobalContext();
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
            const incomeData: IIncomeItemProps = {
                _id: '',
                title,
                amount: parseFloat(amount),
                date,
                category,
                description,
                type: '',
                createdAt: new Date(),
                deleteItem: function (id: string): void {
                    throw new Error('Функція не реалізована');
                },
                indicatorColor: ''
            };
            addIncome(incomeData);
            setInputState({
                title: '',
                amount: '',
                date: null,
                category: '',
                description: '',
            });
        } else {
            setError('Введіть дату');
        }
    };

    return (
        <form className="income-form" onSubmit={handleSubmit}>
            {error && <p className="error-income">{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Назва доходу"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="text"
                    name={'amount'}
                    placeholder={'Сума доходу'}
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    className='input-date'
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
                    <option value="salary">Заробітна плата</option>
                    <option value="freelancing">Фріланс</option>
                    <option value="investments">Інвестиції</option>
                    <option value="stocks">Акції</option>
                    <option value="bitcoin">Біткойн</option>
                    <option value="bank">Банківський переказ</option>
                    <option value="bank">Стипендія</option>
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
                    name={'Додати дохід'}
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

export default IncomeForm;
