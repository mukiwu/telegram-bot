require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
// const FormData = require('form-data');
// const multer = require("multer");
// const fs = require('fs'); 
const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter);

// Telegram BOT
const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;
app.post('/send', async function(req, res){
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
  const headers ={
    "Content-Type": "application/json",
    "cache-control": "no-cache"
  }
  const data = {
    chat_id: CHAT_ID,
    text: req.body.text
  }
  axios.post(url, data, {headers})
    .then(response=>{console.log(response.status)})
    .catch(error=>{console.log(error)}
  );
  res.send();
});

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

// module.exports = app;

var debug = require('debug')('my-application'); // debug模塊
app.set('port', process.env.PORT || 3000); // 設定監聽端口

//啟動監聽
var server = app.listen(app.get('port'), function() {
debug('Express server listening on port ' + server.address().port);
});
