const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');

const cookieParser = require('cookie-parser');

const app = express();

app.set('port', 4000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:4000'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
);
app.use(cookieParser());
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

module.exports.app = app;
