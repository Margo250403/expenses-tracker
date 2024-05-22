// Імпортуємо mongoose
import mongoose from 'mongoose';

// Створюємо схему для доходів з визначенням полів та їхніх властивостей
const IncomeSchema = new mongoose.Schema({
    // Поле для назви доходу
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    // Поле для суми доходу
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    // Поле для типу доходу (за замовчуванням "income")
    type: {
        type: String,
        default: "income"
    },
    // Поле для дати доходу
    date: {
        type: Date,
        required: true,
        trim: true
    },
    // Поле для категорії доходу
    category: {
        type: String,
        required: true,
        trim: true
    },
    // Поле для опису доходу
    description: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true // Видаляє пробіли на початку та в кінці
    }
}, { timestamps: true }); // Додаємо позначки часу для записів (createdAt, updatedAt)

// Експортуємо модель Income, яка використовує схему IncomeSchema
export default mongoose.model('Income', IncomeSchema);
