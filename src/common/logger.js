const morgan = require('morgan');
const appRoot = require('app-root-path');
const winston = require('winston');

const options = {
  fileInfo: {
    filename: `${appRoot}/src/logs/info.log`
  },
  fileError: {
    level: 'error',
    filename: `${appRoot}/src/logs/error.log`
  },
  fileException: {
    level: 'error',
    filename: `${appRoot}/src/logs/exception.log`
  },
  consoleInfo: {
    format: winston.format.combine(
      winston.format.cli(),
      winston.format.colorize()
    )
  }
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf(
      info => `${info.timestamp} ${info.level}: ${info.message}`
    ),
    winston.format.colorize()
  ),
  transports: [
    new winston.transports.Console(options.consoleInfo),
    new winston.transports.File(options.fileInfo),
    new winston.transports.File(options.fileError)
  ],
  exceptionHandlers: [new winston.transports.File(options.fileException)]
});

logger.stream = {
  write: message => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  }
};

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});

morgan.token('query', (req, res) => {
  return JSON.stringify(req.params);
});

module.exports = logger;
