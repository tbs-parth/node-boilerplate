const winston = require('winston');
require('winston-daily-rotate-file');

// Log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Daily rotate file transport
const dailyRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/%DATE%-app.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d' // keep logs for 14 days
});

// Create logger
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(winston.format.timestamp(), logFormat),
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.colorize({ all: true })
        }),
        dailyRotateTransport
    ]
});

module.exports = logger;
