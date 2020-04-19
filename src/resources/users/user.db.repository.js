const path = require('path');
const fs = require('fs');
const taskService = require('../tasks/task.service');
const User = require('./user.model');

const getAll = async () => {
  const users = await User.find();
  return users;
};

const saveUser = async user => {
  await User.create(user);
  return user;
};

const getUser = async id => {
  const user = await User.findById(id);
  return user;
};

const updateUser = async (id, user) => {
  const updateUs = await User.findOneAndUpdate({ _id: id }, user);
  return updateUs;
};

const deleteUser = async id => {
  await User.deleteOne({_id: id});
  // users = users.filter(user => user.id !== id);
  // taskService.userNull(id);
  // return null;
};
module.exports = { getAll, saveUser, getUser, updateUser, deleteUser };
