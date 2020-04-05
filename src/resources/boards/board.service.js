const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const saveBoard = board => boardsRepo.saveBoard(board);
const getBoard = id => boardsRepo.getBoard(id);
const updateBoard = (id, board) => boardsRepo.updateBoard(id, board);
const deleteBoard = id => boardsRepo.deleteBoard(id);
module.exports = { getAll, getBoard, saveBoard, updateBoard, deleteBoard };
