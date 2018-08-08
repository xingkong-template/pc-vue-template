let express = require('express');
let path = require('path');  
var favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let compress = require('compression');
let app = express();
// view engine setup


app.set('views', path.join(__dirname, 'dist'));


app.set('view engine', 'ejs');
app.use(compress());//gzip

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'dist')));

//port
app.use('/', require('./routes/index'));
// app.use('/proxy', require('./routes/proxy'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('h5/error/error');
});

module.exports = app;
