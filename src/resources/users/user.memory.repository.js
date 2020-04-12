const path = require('path');
const fs = require('fs');
let users = require('../../data/users').users;
const taskService = require('../tasks/task.service');

const getAll = async () => {
  return users;
};

const saveUser = async user => {
  await users.push(user);
  return user;
};

const getUser = async id => {
  return users.find(item => item.id === id);
};

const updateUser = async (id, user) => {
  const userId = users.findIndex(item => item.id === id);
  if (userId !== -1) {
    users[userId] = user;
    return users[userId];
  }
  return; 
};

const deleteUser = async id => {
  users = users.filter(user => user.id !== id);
  const test = await taskService.userNull(id);
  console.log(test);
  return null;
};
module.exports = { getAll, saveUser, getUser, updateUser, deleteUser };
