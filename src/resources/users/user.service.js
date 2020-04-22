const usersRepo = require('./user.db.repository');
const bcrypt = require('bcrypt');

const crypt = data => {
  const passUserCrypt = bcrypt.hash(data, 10);
  return passUserCrypt;
};
const getAll = () => usersRepo.getAll();
const saveUser = user => usersRepo.saveUser(user);
const getUser = id => usersRepo.getUser(id);
const updateUser = (id, user) => usersRepo.updateUser(id, user);
const deleteUser = id => usersRepo.deleteUser(id);
module.exports = { getAll, saveUser, getUser, updateUser, deleteUser, crypt };
