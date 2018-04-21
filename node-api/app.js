var express = require('express');
var app = express();
var db = require('./db');

// bind routes
var customers = require('./routes/CustomerController');
app.use('/api', customers);

module.exports = app;