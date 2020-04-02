const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const saveUser = user => usersRepo.saveUser(user);
const getUser = id => usersRepo.getUser(id);
const updateUser = (id, user) => usersRepo.updateUser(id, user);
module.exports = { getAll, saveUser, getUser, updateUser };
