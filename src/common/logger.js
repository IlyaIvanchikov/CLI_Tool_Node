const morgan = require('morgan');
const appRoot = require('app-root-path');
const winston = require('winston');

const options = {
  fileInfo: {
    level: 'info',
    filename: `${appRoot}/src/logs/info.log`,
    json: true,
    colorize: false
  },
  fileError: {
    level: 'error',
    filename: `${appRoot}/src/logs/error.log`,
    json: true,
    colorize: false
  },
  fileException: {
    level: 'error',
    filename: `${appRoot}/src/logs/exception.log`,
    json: true,
    colorize: false
  },
  console: {
    level: 'silly',
    json: false,
    colorize: true
  }
};


const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.File(options.fileInfo),
    new winston.transports.File(options.fileError),
  ],
  exceptionHandlers: [
    new winston.transports.File(options.fileException),
  ]
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

morgan.token('body', function(req, res) {
  return JSON.stringify(req.body);
});

morgan.token('query', function(req, res) {
  return JSON.stringify(req.params);
});

module.exports = logger;
