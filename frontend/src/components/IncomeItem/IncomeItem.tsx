import React from 'react';
import { dateFormat } from '../../utils/dateFormat';
import { bitcoin, book, calender, cardIcon, circle, clothing, comment, dollar, medical, money, piggy, takeaway, trash, tv, users, yt } from '../../utils/icons';
import Button from '../Button/Button';
import '../../styles/IncomeItem.scss';
import { IIncomeItemProps } from '../../interfaces/IIncomeItemProps';

const IncomeItem: React.FC<IIncomeItemProps> = ({
    _id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) => {

    const categoryIcon = () => {
        switch (category) {
            case 'salary':
                return money;
            // case 'freelancing':
            //     return freelance;
            // case 'investments':
            //     return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return cardIcon;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return '';
        }
    };

    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
                return book;
            // case 'groceries':
            //     return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            // case 'travelling':
            //     return freelance;
            case 'other':
                return circle;
            default:
                return '';
        }
    };

    console.log('type', type);

    return (
        <div className="income-item" style={{ borderColor: indicatorColor }}>
            <div className="icon">
                {type === 'expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className="content">
                <h5 style={{ color: indicatorColor }}>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{dollar} {amount}</p>
                        <p>{calender} {dateFormat(date)}</p>
                        <p>
                            {comment}
                            {description}
                        </p>
                    </div>
                    <div className="btn-con">
                    <Button
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            icon={trash}
                            onClick={() => deleteItem(_id)} name={''} 
                    />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncomeItem;
