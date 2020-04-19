const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const saveTask = (boardId, task) => tasksRepo.saveTask(boardId, task);
const getTask = (id, boardId) => tasksRepo.getTask(id, boardId);
const updateTask = (id, boardId, task) =>
  tasksRepo.updateTask(id, boardId, task);
const deleteTask = (id, boardId)=> tasksRepo.deleteTask(id, boardId);
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
