const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const Task = require('./task.model');
const Board = require('../boards/board.model');
let tasks = require('../../data/tasks').tasks;

const getAll = async boardIdOne => {
  const tasks = await Task.find({ boardId: boardIdOne});
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
  const task = await Task.findById({_id: id, boardId: boardId});
  return task;
};

const updateTask = async (id, boardId, task) => {
  const updateTs = await Task.findOneAndUpdate({ _id: id, boardId: boardId }, task);
  return updateTs;
};

const deleteTask = async (id, boardId) => {
  // tasks = tasks.filter(item => item.id !== id);
  // return tasks;
  await Task.deleteOne({_id: id, boardId: boardId});
};

const userNull = async userId => {
  await Task.updateMany({ userId }, { userId: null });
  return;
};

const deleteTaskByBoard = async boardId => {
  // tasks = tasks.filter(task => task.boardId !== boardId);
  // return null;
  await Task.deleteMany({boardId: boardId});
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
