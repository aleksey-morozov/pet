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

// на все запросы методом get отвечаем содержимым файла index.html, чтобы при обращении
// ко всем файлам отрабатывал vuerouter
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));

// запускаем сервер
app.listen(port, (err) => {
  if (err) return console.log(err);
  return console.log(`Сервер успешно запущен на порту ${port}`);
});
