const router = require('express').Router();
const { ErrorHandler } = require('../../common/allError');
const catchError = require('../../common/catchError');
const { OK, FORBIDDEN, BAD_REQUEST } = require('http-status-codes');
const authService = require('./auth.service');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const bcrypt = require('bcrypt');
router.route('/').post(
  catchError(async (req, res) => {
    const { login, password } = req.body;
    if (login && password) {
      const authUser = await authService.getUser(login);
      if (!authUser) {
        throw new ErrorHandler(FORBIDDEN, 'Incorrect username or password');
      }
      const checkPassword = await bcrypt.compare(password, authUser.password);
      if (checkPassword) {
        const token = jwt.sign(
          { login, userId: authUser._id },
          JWT_SECRET_KEY,
          { expiresIn: '1h' }
        );
        return res.status(OK).send({ token });
      }
      throw new ErrorHandler(
        BAD_REQUEST,
        'Authentication failed! Please check the request'
      );
    }
    throw new ErrorHandler(
      BAD_REQUEST,
      'Authentication failed! Please check the request'
    );
  })
);

module.exports = router;
