// Імпортуємо mongoose
import mongoose from 'mongoose';

// Створюємо схему для витрат з визначенням полів та їхніх властивостей
const ExpenseSchema = new mongoose.Schema({
    // Поле для назви витрати
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    // Поле для суми витрати
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    // Поле для типу витрати (за замовчуванням "expense")
    type: {
        type: String,
        default: "expense"
    },
    // Поле для дати витрати
    date: {
        type: Date,
        required: true,
        trim: true
    },
    // Поле для категорії витрати
    category: {
        type: String,
        required: true,
        trim: true
    },
    // Поле для опису витрати
    description: {
        type: String,
        required: true,
        maxLength: 200,
        trim: true
    }
}, { timestamps: true }); // Додаємо позначки часу для записів (createdAt, updatedAt)

// Експортуємо модель Expense, яка використовує схему ExpenseSchema
const Expense = mongoose.model('Expense', ExpenseSchema);
export default Expense;
