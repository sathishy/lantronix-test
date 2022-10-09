var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morganBody = require('morgan-body');
require('dotenv').config({ path: `.${process.env.NODE_ENV}.env` });
const logger = require('./logger');

//Importing Routes 
var indexRouter = require('./routes/index');
var docsRouter = require('./routes/docs');
var usersRouter = require('./routes/users');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

morganBody(app, {
  prettify: true,
  stream: {
    write: message => logger.log('verbose', message.trim())
  }
})

//Main Routes endpoints
app.use('/', indexRouter);
app.use('/docs', docsRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  logger.error(err.stack)
  // render the error page
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
