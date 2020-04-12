const morgan = require('morgan');
const appRoot = require('app-root-path');
const winston = require('winston');

var options = {
  file: {
    level: 'info',
    filename: `${appRoot}/src/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.File(options.file)
  ],
  exitOnError: false // do not exit on handled exceptions
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};
// logger.info('hello', { message: 'world' });

morgan.token('body', function(req, res) {
  return JSON.stringify(req.body);
});

morgan.token('query', function(req, res) {
  return JSON.stringify(req.query);
});

module.exports = logger;
