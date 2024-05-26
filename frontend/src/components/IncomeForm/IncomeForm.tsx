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
                    throw new Error('Function not implemented.');
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
            setError('Please select a date.');
        }
    };

    return (
        <form className="income-form" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Income Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="text"
                    name={'amount'}
                    placeholder={'Income Amount'}
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date: Date | null) => {
                        setInputState({ ...inputState, date });
                    }}
                />
            </div>
            <div className={`${"selects"} ${"input-control"}`}>
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="bank">Stipend</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <textarea
                    name="description"
                    value={description}
                    placeholder='Add A Reference'
                    id="description"
                    cols={30}
                    rows={4}
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="submitBtn">
                <Button
                    name={'Add Income'}
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
