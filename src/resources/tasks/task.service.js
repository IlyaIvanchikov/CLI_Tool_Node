const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const saveTask = (boardId, task) => tasksRepo.saveTask(boardId, task);
const getTask = (id, boardId) => tasksRepo.getTask(id, boardId);
const updateTask = (id, boardId, task) =>
  tasksRepo.updateTask(id, boardId, task);
const deleteTask = id => tasksRepo.deleteTask(id);
const userNull = id => tasksRepo.userNull(id);
const deleteTaskByBoard = boardId => tasksRepo.deleteTaskByBoard(boardId);
module.exports = {
  getAll,
  getTask,
  saveTask,
  updateTask,
  deleteTask,
  userNull,
  deleteTaskByBoard
};
