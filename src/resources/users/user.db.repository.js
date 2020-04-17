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
  // const userId = users.findIndex(item => item.id === id);
  // if (userId !== -1) {
  //   users[userId] = user;
  //   return users[userId];
  // }
  // return;
  const updateUs = await User.findOneAndUpdate({ _id: id }, user);
  console.log(updateUs);
  return updateUs;
};

const deleteUser = async id => {
  // users = users.filter(user => user.id !== id);
  // taskService.userNull(id);
  // return null;
  throw new Error();
};
module.exports = { getAll, saveUser, getUser, updateUser, deleteUser };
