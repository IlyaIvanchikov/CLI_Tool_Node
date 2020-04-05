const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  if (users.length !== 0) {
    return res.status(200).json(users.map(User.toResponse));
  }
  return res.status(200).send('Access token is missing or invalid');
});

router.route('/').post(async (req, res) => {
  const user = new User(req.body);
  if (user != undefined) {
    await usersService.saveUser(user);
    const users = await usersService.getUser(user.id);
    return res.status(200).json(User.toResponse(users));
  }
  return res.status(404).send('Bad request');
});

router.route('/:id').get(async (req, res) => {
  const users = await usersService.getUser(req.params.id);
  if (users !== undefined) {
    return res.status(200).json(User.toResponse(users));
  }
  return res.status(400).send('Access token is missing or invalid');
});

router.route('/:id').put(async (req, res) => {
  const user = new User(req.body);
  const id = req.params.id;
  const userOne = await usersService.updateUser(id, user);
  if ( userOne !== undefined) {
    return res.status(200).json(User.toResponse(userOne));
  }
  else {
    return res.status(404).send('Bad request');
  }
});

router.route('/:id').delete(async (req, res) => {
  const usersAll = await usersService.getAll();
  const users = await usersService.deleteUser(req.params.id);
  if (users.length === usersAll.length) {
    return res
      .status(404)
      .send('User not found')
  } else {
    return res.status(200).json(users.map(User.toResponse));
  }
});
module.exports = router;
