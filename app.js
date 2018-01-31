const express           = require('express');
const path              = require('path');
const favicon           = require('static-favicon');
const logger            = require('morgan');
const cookieParser      = require('cookie-parser');
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const term              = require('terminal-kit').terminal;

const config            = require('./config/config');

// routes
const routes            = require('./routes/index');
const users             = require('./routes/users');

const app               = express();

mongoose.Promise        = global.Promise;

mongoose.connect(config.database, err => {
    if (err) {
        term.red("DB Error on Connection: /app");
    } else {
        term.blue("successfully connected to the database.");
    }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 403 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Forbidden');
    err.status = 403;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


module.exports = app;
