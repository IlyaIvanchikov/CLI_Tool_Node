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
      if (!users) {
        throw new ErrorHandler(NOT_FOUND, 'Users are not found');
      }
      return res.status(OK).json(users.map(User.toResponse));
    })
  )
  .post(
    catchError(async (req, res) => {
      const user = new User({
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
      });
      if (user.name !== undefined) {
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
      const user = await usersService.getUser(req.params.id);
      if (!user) {
        throw new ErrorHandler(
          UNAUTHORIZED,
          '	Access token is missing or invalid'
        );
      }
      return res.status(OK).json(User.toResponse(user));
    })
  )
  .put(
    catchError(async (req, res) => {
      const id = req.params.id;
      const updateUser = await usersService.updateUser(id, req.body);
      if (updateUser !== null) {
        return res.status(OK).json(User.toResponse(updateUser));
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
