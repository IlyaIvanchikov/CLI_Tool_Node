const router = require('express').Router();
const { ErrorHandler } = require('../../common/allError');
const catchError = require('../../common/catchError');
const { OK, FORBIDDEN, BAD_REQUEST } = require('http-status-codes');
const authService = require('./auth.service');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
router
  .route('/')
  //   .get(
  //     catchError(async (req, res) => {
  //       const boards = await BoardsService.getAll();
  //       if (!boards) {
  //         throw new ErrorHandler(NOT_FOUND, 'Users are not found');
  //       }
  //       return res.status(OK).json(boards.map(Board.toResponse));
  //     })
  //   )
  .post(
    catchError(async (req, res) => {
      const { login, password } = req.body;
      if (login && password) {
        const authUser = await authService.getUser(login, password);
        if (authUser) {
          const token = jwt.sign(
            { login, userId: authUser.userId },
            JWT_SECRET_KEY,
            { expiresIn: '1h' }
          );
          return res.status(OK).json(token);
        }
        throw new ErrorHandler(FORBIDDEN, 'Incorrect username or password');
      }
      throw new ErrorHandler(
        BAD_REQUEST,
        'Authentication failed! Please check the request'
      );
    })
  );

module.exports = router;
