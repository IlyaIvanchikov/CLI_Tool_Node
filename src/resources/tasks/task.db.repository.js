const Task = require('./task.model');
const Board = require('../boards/board.model');

const getAll = async boardIdOne => {
  const tasks = await Task.find({ boardId: boardIdOne });
  return tasks;
};

const saveTask = async (boardId, task) => {
  const taskOne = await Board.findById(boardId);
  if (!taskOne) {
    return;
  }
  const taskAdd = await Task.create(task);
  return taskAdd;
};

const getTask = async (id, boardId) => {
  const task = await Task.findById({ _id: id, boardId });
  return task;
};

const updateTask = async (id, boardId, task) => {
  const updateTs = await Task.findOneAndUpdate({ _id: id, boardId }, task);
  return updateTs;
};

const deleteTask = async (id, boardId) => {
  await Task.deleteOne({ _id: id, boardId });
};

const userNull = async userId => {
  await Task.updateMany({ userId }, { userId: null });
  return;
};

const deleteTaskByBoard = async boardId => {
  await Task.deleteMany({ boardId });
  return null;
};

module.exports = {
  getAll,
  getTask,
  saveTask,
  updateTask,
  deleteTask,
  userNull,
  deleteTaskByBoard
};
