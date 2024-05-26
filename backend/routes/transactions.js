// Імпортуємо необхідні модулі з express та контролери для обробки доходів і витрат
import express from 'express';
import { check } from 'express-validator';
import { register, login, getUser, logout } from '../controllers/auth.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { Router } from 'express';
import { addExpense, getExpense, deleteExpense, updateExpense } from '../controllers/expense.js';
import { addIncome, getIncomes, deleteIncome, updateIncome } from '../controllers/income.js';

const router = Router();

// Маршрути для авторизації та реєстрації
router.post('/register', [
  check('username', 'Ім\'я користувача є обов\'язковим').not().isEmpty(),
  check('email', 'Будь ласка, введіть дійсну електронну пошту').isEmail(),
  check('password', 'Пароль повинен містити 6 або більше символів').isLength({ min: 6 })
], register);

router.post('/login', [
  check('email', 'Будь ласка, введіть дійсну електронну пошту').isEmail(),
  check('password', 'Пароль є обов\'язковим').exists()
], login);

router.get('/user', authMiddleware, getUser);

// Визначаємо маршрути для обробки запитів до API
// Маршрут для додавання доходу
router.post('/add-income', addIncome)
  // Маршрут для отримання всіх доходів
  .get('/get-incomes', getIncomes)
  // Маршрут для видалення доходу за ідентифікатором
  .delete('/delete-income/:id', deleteIncome)
  // Маршрут для редагування витрат
  .put('/update-income/:id', updateIncome)
  // Маршрут для додавання витрат
  .post('/add-expense', addExpense)
  // Маршрут для отримання всіх витрат
  .get('/get-expenses', getExpense)
  // Маршрут для видалення витрат за ідентифікатором
  .delete('/delete-expense/:id', deleteExpense)
  // Маршрут для зміни витрат за ідентифікатором
  .put('/update-expense/:id', updateExpense)
  // Вихід користувача з системи
  .post('/logout', logout);
export default router;