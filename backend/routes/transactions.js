// Імпортуємо необхідні модулі з express та контролери для обробки доходів і витрат
import { Router } from 'express';
import { addExpense, getExpense, deleteExpense } from '../controllers/expense.js';
import { addIncome, getIncomes, deleteIncome } from '../controllers/income.js';

const router = Router();

// Визначаємо маршрути для обробки запитів до API
// Маршрут для додавання доходу
router.post('/add-income', addIncome)
  // Маршрут для отримання всіх доходів
  .get('/get-incomes', getIncomes)
  // Маршрут для видалення доходу за ідентифікатором
  .delete('/delete-income/:id', deleteIncome)
  // Маршрут для додавання витрат
  .post('/add-expense', addExpense)
  // Маршрут для отримання всіх витрат
  .get('/get-expenses', getExpense)
  // Маршрут для видалення витрат за ідентифікатором
  .delete('/delete-expense/:id', deleteExpense);

export default router;

// router.get('/', (req, res) => {
//     res.send('Hello')
// })