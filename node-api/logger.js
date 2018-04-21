var winston = require('winston');

// winston logger file
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'logger.log' })
    ]
});

module.exports = logger