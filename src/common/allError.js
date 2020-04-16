const logger = require('../common/logger');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
const handleError = (err, res) => {
  const { statusCode, message } = err;
  logger.error(`${statusCode} ${message}`);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

module.exports = {
  ErrorHandler,
  handleError
};
