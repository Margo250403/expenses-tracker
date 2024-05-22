// Імпортуємо необхідні модулі
import express from 'express';
import cors from 'cors';
import { database } from './database/database.js';
import { readdirSync } from 'fs';
import dotenv from 'dotenv';

// Завантажуємо змінні з файлу .env
dotenv.config();

// Створюємо екземпляр Express-додатку
const app = express();

// Встановлюємо порт з змінної оточення
const PORT = process.env.PORT;

// middlewares (проміжні програмні засоби)
app.use(express.json()); // Парсер JSON для вхідних запитів
app.use(cors()); // Включаємо CORS для всіх запитів

// Підключаємо всі маршрути з папки './routes'
readdirSync('./routes').map((route) => {
  import(`./routes/${route}`).then((routeModule) => {
    app.use('/api/v1', routeModule.default); // Використовуємо маршрут з префіксом '/api/v1'
  });
});

// Функція для запуску сервера
const server = () => {
  database(); // Підключення до бази даних
  app.listen(PORT, () => {
    console.log('Listening to the port:', PORT); // Виводимо повідомлення про успішний запуск сервера
  });
};

// Запускаємо сервер
server();