const express = require('express');
const path = require('path');
const stocksRouter = require('./routes/stocks');
const stocksService = require('./services/stocksService');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE_PATH = path.join(__dirname, 'data', 'stocks.json');

stocksService.init(DATA_FILE_PATH);

// Middleware для обработки JSON в теле POST/PATCH-запросов.
app.use(express.json());

// Middleware для журнала входящих запросов.
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Статические файлы интерфейса Spotify-style.
app.use(express.static(path.join(__dirname, '..', 'public')));

// REST API карточек треков (сохраняем имя ресурса stocks из задания).
app.use('/stocks', stocksRouter);

app.get('/api-info', (req, res) => {
  res.json({ message: 'Spotify Cards REST API работает', endpoints: ['GET /stocks', 'POST /stocks', 'GET /stocks/:id', 'PATCH /stocks/:id', 'DELETE /stocks/:id'] });
});

// Обработка неизвестных маршрутов.
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Централизованная обработка ошибок.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
  console.log(`Spotify REST API запущен: http://localhost:${PORT}`);
});
