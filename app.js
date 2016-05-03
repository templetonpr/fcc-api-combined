"use strict";

// modules
let pg         = require('pg');
let path       = require('path');
let morgan     = require('morgan');
let express    = require('express');
let bodyParser = require('body-parser');
let favicon    = require('serve-favicon');

// routes
let routes       = require('./routes/index');
let headParse    = require('./routes/headParse');
let imgSearch    = require('./routes/imgSearch');
let timestamp    = require('./routes/timestamp');
let urlShortener = require('./routes/urlShortener');
let fileMetadata = require('./routes/fileMetadata');

let app = express();

// You don't need to see my identification ✋
app.disable('x-powered-by');

// app variables
app.set('FMD_MAX_FILE_SIZE', (process.env.FMD_MAX_FILE_SIZE || 1000000));
app.set('FMD_SAVE_FILES', (process.env.FMD_SAVE_FILES || false));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// misc middleware config
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes setup
app.use('/', routes);
app.use('/hp', headParse);
app.use('/img', imgSearch);
app.use('/ts', timestamp);
app.use('/urls', urlShortener);
app.use('/fmd', fileMetadata);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler - will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler - no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
