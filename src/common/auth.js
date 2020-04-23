const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config.js');
const catchError = require('./catchError');
const { UNAUTHORIZED } = require('http-status-codes');
const { ErrorHandler } = require('./allError');

const checkToken = catchError((req, res, next) => {
  if (!req.headers.authorization) throw new ErrorHandler(UNAUTHORIZED, 'Unauthorized');
  
  const [type, token] = req.headers.authorization.split(' ');
  if (type !== 'Bearer') throw new ErrorHandler(UNAUTHORIZED, 'Unauthorized');

  jwt.verify(token, JWT_SECRET_KEY, err => {
    if (err) {
      throw new ErrorHandler(UNAUTHORIZED, 'Unauthorized');
    } else {
      return next();
    }
  });
});

module.exports = checkToken;
