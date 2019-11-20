'use strict';

// стандартный модуль ноды для работы с путями файлов
const path = require('path');
// express(установили через npm)
const express = require('express');

// создание веб-сервера
const app = express();
// порт получается из переменных окружения (могут быть заданы ключами при запуске ноды)
const port = process.env.PORT || 8080;

// включаем сервер статических файлов из папки dist
app.use(express.static(path.join(__dirname, 'dist')));

// запускаем сервер
app.listen(port, (err) => {
  if (err) return console.log(err);
  return console.log(`Сервер успешно запущен на порту ${port}`);
});
