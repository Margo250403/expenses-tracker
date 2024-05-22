import mongoose from 'mongoose';

// Асинхронна функція для підключення до бази даних
const database = async () => {
  try {
    // Вимикаємо перевірку запитів
    mongoose.set('strictQuery', false);
    // Підключаємося до бази даних, використовуючи URL з змінної оточення
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database connected');
  } catch (error) {
    console.error('Error with database connection:', error);
  }
};

export { database };
