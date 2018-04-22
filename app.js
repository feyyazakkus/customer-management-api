var express = require('express');
var app = express();
var db = require('./db');

// headers middleware for all routes
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With, Cache-Control, content-type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

module.exports = app;