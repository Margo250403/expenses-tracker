import jwt from 'jsonwebtoken';

// Middleware для перевірки токена
const authMiddleware = (req, res, next) => {
  // Отримання токена з заголовка
  const token = req.header('x-auth-token');

  // Перевірка наявності токена
  if (!token) {
    return res.status(401).json({ msg: 'Немає токена, авторизацію відхилено' });
  }

  try {
    // Верифікація токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Додавання користувача з декодованого токена до запиту
    req.user = decoded.user;
    // Перехід до наступного middleware
    next();
  } catch (err) {
    // Випадок невалідного токена
    res.status(401).json({ msg: 'Токен недійсний' });
  }
};

export default authMiddleware;
