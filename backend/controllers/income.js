// Імпортуємо модель IncomeSchema з файлу IncomeModel
import IncomeSchema from '../models/IncomeModel.js';

// Функція для додавання доходу
export const addIncome = async (req, res) => {
    // Отримуємо дані з тіла запиту
    const { title, amount, category, description, date } = req.body;

    // Створюємо новий документ доходу, використовуючи модель IncomeSchema
    const income = new IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        // Валідація даних
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'Усі поля обов’язкові!' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Сума повинна бути додатнім числом!' });
        }
        // Зберігаємо документ в базу даних
        await income.save();
        res.status(200).json({ message: 'Дохід додано' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
    
    // Виводимо дані доходу в консоль
    console.log(income);
};

// Функція для отримання всіх доходів
export const getIncomes = async (req, res) => {
    try {
        // Отримуємо всі документи доходів з бази даних та сортуємо їх за датою створення (в порядку спадання)
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

// Функція для видалення доходу за ідентифікатором
export const deleteIncome = async (req, res) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: 'Дохід видалено' });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Помилка сервера' });
        });
};

// Функція для редагування доходу
export const updateIncome = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;
  
    try {
      const income = await IncomeSchema.findById(id);
  
      if (!income) {
        return res.status(404).json({ message: 'Дохід не знайдений' });
      }
  
      income.title = title;
      income.amount = amount;
      income.category = category;
      income.description = description;
      income.date = date;
  
      await income.save();
      res.status(200).json({ message: 'Дохід оновлено' });
    } catch (error) {
      res.status(500).json({ message: 'Помилка сервера' });
    }
  };