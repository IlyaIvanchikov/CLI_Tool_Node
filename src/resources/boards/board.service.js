const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const saveBoard = board => boardsRepo.saveBoard(board);
const getBoard = id => boardsRepo.getBoard(id);
// const updateUser = (id, user) => usersRepo.updateUser(id, user);
// const deleteUser = id => usersRepo.deleteUser(id);
module.exports = { getAll, getBoard, saveBoard };
