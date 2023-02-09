const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'error',
            filename: 'src/log/error-log.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        })
    ]
});

module.exports = logger;