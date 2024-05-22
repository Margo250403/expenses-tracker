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
                _id: '', // Assign a real ID when integrating with backend
                title,
                amount: parseFloat(amount),
                date,
                category,
                description,
                type: '', // Or determine based on the form
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
            setError('Please select a date.');
        }

    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="inputControl">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="inputControl">
                <input
                    value={amount}
                    type="text"
                    name={'amount'}
                    placeholder={'Expense Amount'}
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="inputControl">
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
            <div className={`${"selects"} ${"inputControl"}`}>
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>
                    <option value="travelling">Travelling</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="inputControl">
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
                    name={'Add Expense'}
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
