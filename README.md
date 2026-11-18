# Лабораторная работа №4 — Spotify Cards REST API

Backend на Node.js + Express.js с интерфейсом в стиле Spotify. Реализована слоистая архитектура и REST API для карточек музыкальной коллекции. Название ресурса `/stocks` оставлено как в методических указаниях.

## Структура проекта

```text
LR4_Spotify/
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── src/
│   ├── index.js
│   ├── routes/
│   │   └── stocks.js
│   ├── controllers/
│   │   └── stocksController.js
│   ├── services/
│   │   ├── fileService.js
│   │   └── stocksService.js
│   └── data/
│       └── stocks.json
├── package.json
└── README.md
```

## Запуск в VS Code

1. Установить Node.js (если ещё не установлен).
2. Открыть папку проекта в VS Code.
3. Открыть терминал VS Code (`Terminal → New Terminal`).
4. Выполнить команды:

```bash
npm install
npm run dev
```

Если всё запустилось, в терминале появится адрес `http://localhost:3000`. Открой его в браузере. Для обычного запуска без nodemon используется `npm start`.

## REST API

| Метод | URL | Назначение |
|---|---|---|
| GET | `/stocks` | Получить все карточки |
| GET | `/stocks?title=weeknd` | Поиск по названию |
| GET | `/stocks/:id` | Получить карточку по ID |
| POST | `/stocks` | Создать карточку |
| PATCH | `/stocks/:id` | Изменить карточку |
| DELETE | `/stocks/:id` | Удалить карточку |

### Пример тела POST/PATCH

```json
{
  "src": "https://example.com/cover.jpg",
  "title": "Artist — Track name",
  "text": "Описание музыкального трека"
}
```

Для POST и PATCH все три поля обязательны. `src` должен быть корректной ссылкой http/https. Ответы API возвращаются в JSON; при ошибках используются HTTP-статусы 400, 404 и 500.

## Проверка в Postman

1. `GET http://localhost:3000/stocks` — получить список.
2. `GET http://localhost:3000/stocks/1` — получить карточку с ID 1.
3. `POST http://localhost:3000/stocks` — создать карточку; Body → raw → JSON, вставить пример JSON выше.
4. `PATCH http://localhost:3000/stocks/1` — изменить карточку, передав JSON с полями `src`, `title`, `text`.
5. `DELETE http://localhost:3000/stocks/1` — удалить карточку.

Дополнительно: `GET http://localhost:3000/api-info` показывает список доступных маршрутов.

Данные хранятся в `src/data/stocks.json`, поэтому изменения сохраняются после перезапуска сервера.
