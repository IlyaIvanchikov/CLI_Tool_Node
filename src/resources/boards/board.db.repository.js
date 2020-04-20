const Board = require('./board.model');
const taskService = require('../tasks/task.service');

const getAll = async () => {
  const boards = await Board.find();
  return boards;
};

const saveBoard = async board => {
  const boardOne = await Board.create(board);
  return boardOne;
};

const getBoard = async id => {
  const board = await Board.findById(id);
  return board;
};

const updateBoard = async (id, board) => {
  const updateBd = await Board.findOneAndUpdate({ _id: id }, board);
  return updateBd;
};

const deleteBoard = async id => {
  await Board.deleteOne({ _id: id });
  await taskService.deleteTaskByBoard(id);
};
module.exports = { getAll, getBoard, saveBoard, updateBoard, deleteBoard };
