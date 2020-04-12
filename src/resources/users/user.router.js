const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const responseForClient = require('../../common/allError');

router.route('/').get(async (req, res, next) => {
  const users = await usersService.getAll();
  if (users.length !== 0) {
    return res.status(200).json(users.map(User.toResponse));
  }
  return responseForClient(401, res);
});

router.route('/').post(async (req, res) => {
  const user = new User(req.body);
  if (user !== undefined) {
    await usersService.saveUser(user);
    return res.status(200).json(User.toResponse(user));
  }
  return responseForClient(404, res);
});

router.route('/:id').get(async (req, res) => {
  const users = await usersService.getUser(req.params.id);
  if (!users) {
    return responseForClient(400, res);
  }
  return res.status(200).json(User.toResponse(users));
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const userOne = await usersService.updateUser(id, req.body);
  if (userOne !== undefined) {
    return res.status(200).json(User.toResponse(userOne));
  }

  return responseForClient(404, res);
});

router.route('/:id').delete(async (req, res) => {
  // const usersAll = await usersService.getAll();
  // const users = await usersService.deleteUser(req.params.id);
  // if (users.length === usersAll.length) {
  //   return res.status(404).send('User not found');
  // }
  // return res.status(204).json({ message: 'The user has been deleted' });
  await usersService.deleteUser(req.params.id);
  res.status(204).json({ message: 'The user has been deleted' });
});
module.exports = router;
