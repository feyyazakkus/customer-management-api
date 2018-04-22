var mongoose = require('mongoose'),
    config = require('./config'),
    logger = require('./logger'),
    autoIncrement = require('mongoose-auto-increment');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, function (err) {
    if (err) logger.error(err);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Conntected to database..");    
});

autoIncrement.initialize(db);

module.exports = db;