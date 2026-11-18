const stocksService = require('../services/stocksService');

const getAllStocks = (req, res) => {
  const { title } = req.query;
  res.json(stocksService.findAll(title));
};

const getStockById = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Некорректный ID карточки' });
  }
  const stock = stocksService.findOne(id);
  if (!stock) return res.status(404).json({ error: 'Карточка не найдена' });
  return res.json(stock);
};

const validateStock = (body) => {
  const { src, title, text } = body;
  if (typeof src !== 'string' || !src.trim() ||
      typeof title !== 'string' || !title.trim() ||
      typeof text !== 'string' || !text.trim()) {
    return 'Заполните все поля: src, title и text';
  }
  try {
    const parsed = new URL(src);
    if (!['http:', 'https:'].includes(parsed.protocol)) return 'Ссылка должна начинаться с http:// или https://';
  } catch {
    return 'Укажите корректную ссылку на обложку';
  }
  return null;
};

const createStock = (req, res) => {
  const error = validateStock(req.body);
  if (error) return res.status(400).json({ error });
  const { src, title, text } = req.body;
  const newStock = stocksService.create({ src: src.trim(), title: title.trim(), text: text.trim() });
  return res.status(201).json(newStock);
};

const updateStock = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'Некорректный ID карточки' });
  const error = validateStock(req.body);
  if (error) return res.status(400).json({ error });
  const { src, title, text } = req.body;
  const updatedStock = stocksService.update(id, { src: src.trim(), title: title.trim(), text: text.trim() });
  if (!updatedStock) return res.status(404).json({ error: 'Карточка не найдена' });
  return res.json(updatedStock);
};

const deleteStock = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'Некорректный ID карточки' });
  const success = stocksService.remove(id);
  if (!success) return res.status(404).json({ error: 'Карточка не найдена' });
  return res.status(204).send();
};

module.exports = { getAllStocks, getStockById, createStock, updateStock, deleteStock };
