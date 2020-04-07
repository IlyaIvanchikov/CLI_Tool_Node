const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const saveTask = (boardId, task) => tasksRepo.saveTask(boardId, task);
const getTask = id => tasksRepo.getTask(id);
const updateTask = (id, task) => tasksRepo.updateTask(id, task);
const deleteTask = (id, boardId) => tasksRepo.deleteTask(id, boardId);
const getAllTask = () => tasksRepo.getAllTask();
module.exports = {
  getAll,
  getTask,
  saveTask,
  updateTask,
  deleteTask,
  getAllTask
};
