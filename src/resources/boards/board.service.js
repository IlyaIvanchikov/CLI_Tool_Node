const usersRepo = require('./board.memory.repository');

const getAll = () => usersRepo.getAll();
// const saveUser = user => usersRepo.saveUser(user);
const getBoard = id => usersRepo.getBoard(id);
// const updateUser = (id, user) => usersRepo.updateUser(id, user);
// const deleteUser = id => usersRepo.deleteUser(id);
module.exports = { getAll, getBoard };
