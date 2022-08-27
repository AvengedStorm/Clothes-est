const express = require('express');
const app = express();
const cors = require('cors');
var cookieParser = require('cookie-parser')
const itemRouter = require('./api/routes/items');
const favoritesRouter = require('./api/routes/favorites');
const setsRouter = require('./api/routes/sets');
const usersRouter = require('./api/routes/users');
const loginRouter = require('./api/routes/login');

app.use(express.json({
    limit: "2mb"
}));
app.use(express.urlencoded({
    extended: true,
    limit: "2mb"
}));
app.use(cookieParser());
app.use(cors());
app.use(express.static('uploads/'));
app.use('/login', loginRouter);
app.use('/items', itemRouter);
app.use('/favorites', favoritesRouter);
app.use('/sets', setsRouter);
app.use('/users', usersRouter);

module.exports = app