import ExpenseSchema from '../models/ExpenseModel.js';

// Функція для додавання витрати
export const addExpense = async (req, res) => {
    // Отримуємо дані з тіла запиту
    const { title, amount, category, description, date } = req.body;

    // Створюємо новий документ витрати, використовуючи модель ExpenseSchema
    const expense = new ExpenseSchema({
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
        await expense.save();
        res.status(200).json({ message: 'Витрата додана' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }

    // Виводимо дані витрати в консоль
    console.log(expense);
};

// Функція для отримання всіх витрат
export const getExpense = async (req, res) => {
    try {
        // Отримуємо всі документи витрат з бази даних та сортуємо їх за датою створення (в порядку спадання)
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

// Функція для видалення витрати за ідентифікатором
export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({ message: 'Витрата видалена' });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Помилка сервера' });
        });
};

// Функція для редагування витрати
export const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;
  
    try {
      const expense = await ExpenseSchema.findById(id);
  
      if (!expense) {
        return res.status(404).json({ message: 'Витрата не знайдена' });
      }
  
      expense.title = title;
      expense.amount = amount;
      expense.category = category;
      expense.description = description;
      expense.date = date;
  
      await expense.save();
      res.status(200).json({ message: 'Витрата оновлена' });
    } catch (error) {
      res.status(500).json({ message: 'Помилка сервера' });
    }
  };