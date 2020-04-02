const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const users = await usersService.getUser(req.params.id);
  res.json(User.toResponse(users));
});

router.route('/').post(async (req, res) => {
  const user = new User(req.body);
  await usersService.saveUser(user);
});

router.route('/:id').put(async (req, res) => {
  const user = new User(req.body);
  const id = req.params.id;
  await usersService.updateUser(id, user);
});
module.exports = router;
