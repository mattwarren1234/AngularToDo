'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var apiRoutes = require('./apiProxyRoutes.js');
var routes = require('./routes.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/components', express.static(path.join(__dirname, 'components')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

app.use('/api', apiRoutes);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

var port = process.env.PORT || 8080; 
app.listen(port);
console.log('now listening on ' + port + '!');

module.exports = app;
