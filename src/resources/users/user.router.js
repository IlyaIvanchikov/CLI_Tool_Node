const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  if (users.length !== 0) {
    return res.status(200).json(users.map(User.toResponse));
  }
  return res.status(401).send('Access token is missing or invalid');
});

router.route('/').post(async (req, res) => {
  const user = new User(req.body);
  if (user !== undefined) {
    await usersService.saveUser(user);
    return res.status(200).json(User.toResponse(user));
  }
  return res.status(404).send('Bad request');
});

router.route('/:id').get(async (req, res) => {
  const users = await usersService.getUser(req.params.id);
  if (!users) {
    return res.status(400).send('Access token is missing or invalid');
  }
  return res.status(200).json(User.toResponse(users));
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const userOne = await usersService.updateUser(id, req.body);
  if (userOne !== undefined) {
    return res.status(200).json(User.toResponse(userOne));
  }

  return res.status(404).send('Bad request');
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
