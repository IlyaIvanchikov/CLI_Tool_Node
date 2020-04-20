const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { ErrorHandler } = require('../../common/allError');
const catchError = require('../../common/catchError');
const {
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
  NO_CONTENT
} = require('http-status-codes');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const users = await usersService.getAll();
      if (users.length !== 0) {
        return res.status(OK).json(users.map(User.toResponse));
      }
      throw new ErrorHandler(NOT_FOUND, 'Users are not found');
    })
  )
  .post(
    catchError(async (req, res) => {
      const user = new User(req.body);
      if (user !== undefined) {
        await usersService.saveUser(user);
        return res.status(OK).json(User.toResponse(user));
      }
      throw new ErrorHandler(NOT_FOUND, 'Users are not found');
    })
  );
router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const users = await usersService.getUser(req.params.id);
      if (!users) {
        throw new ErrorHandler(
          UNAUTHORIZED,
          '	Access token is missing or invalid'
        );
      }
      return res.status(OK).json(User.toResponse(users));
    })
  )
  .put(
    catchError(async (req, res) => {
      const id = req.params.id;
      const userOne = await usersService.updateUser(id, req.body);
      if (userOne !== undefined) {
        return res.status(OK).json(User.toResponse(userOne));
      }
      throw new ErrorHandler(NOT_FOUND, 'Users are not found');
    })
  )
  .delete(
    catchError(async (req, res) => {
      await usersService.deleteUser(req.params.id);
      res.status(NO_CONTENT).json({ message: 'The user has been deleted' });
    })
  );
module.exports = router;
