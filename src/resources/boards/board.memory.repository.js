let boards = require('../../data/boards').boards;
const taskService = require('../tasks/task.service');

const getAll = async () => {
  return boards;
};

const saveBoard = async board => {
  await boards.push(board);
  return boards;
};

const getBoard = async id => {
  return boards.find(item => item.id === id);
};

const updateBoard = async (id, board) => {
  const boardId = boards.findIndex(item => item.id === id);
  if (boardId !== -1) {
    boards[boardId] = board;
    return boards[boardId];
  }
  return;
};

const deleteBoard = async id => {
  boards = boards.filter(board => board.id !== id);
  await taskService.deleteTaskByBoard(id);
  return boards;
};
module.exports = { getAll, getBoard, saveBoard, updateBoard, deleteBoard };
