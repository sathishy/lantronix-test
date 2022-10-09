const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '500m',
      maxFiles: '30d'
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'logs/verbose.log',
      level: 'verbose'
    })
  ]
})
module.exports = logger;
