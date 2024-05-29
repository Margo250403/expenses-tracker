// Імпортуємо необхідні модулі
import express from 'express';
import cors from 'cors';
import { database } from './database/database.js';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactions.js';

// Завантажуємо змінні з файлу .env
dotenv.config();

// Створюємо екземпляр Express-додатку
const app = express();

// Встановлюємо порт з змінної оточення
const PORT = process.env.PORT;

// middlewares (проміжні програмні засоби)
app.use(express.json()); // Парсер JSON для вхідних запитів
app.use(cors()); // Включаємо CORS для всіх запитів

// Підключаємо маршрути авторизації та обробки транзакцій
app.use('/api/v1', transactionRoutes);

// Функція для запуску сервера
const server = () => {
  database(); // Підключення до бази даних
  app.listen(PORT, () => {
    console.log('Listening to the port:', PORT); // Виводимо повідомлення про успішний запуск сервера
  });
};

// Запускаємо сервер
server();