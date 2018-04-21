var mongoose = require('mongoose');
var config = require('./config');
var autoIncrement = require('mongoose-auto-increment');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Conntected to database..");    
});

autoIncrement.initialize(db);

module.exports = db;