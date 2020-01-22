var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('config')  //we load the db location from the JSON files
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

require('./db');

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
  //use morgan to log at command line
  app.use(logger('combined')); //'combined' outputs the Apache style LOGs
}

const router = express.Router()
usersRouter(router)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
