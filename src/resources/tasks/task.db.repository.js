const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const Task = require('./task.model');
let tasks = require('../../data/tasks').tasks;

const getAll = async boardIdOne => {
  const tasks = await Task.find({ boardId: boardIdOne});
  return tasks;
};

const saveTask = async (boardId, task) => {
  // const taskOne = await Task.findOne({ _id: boardId });
  // console.log(taskOne);
  // if (!taskOne) {
  //   return;
  // }
  const taskAdd = await Task.create(task);
  return taskAdd;
};

const getTask = async (id, boardId) => {
  return tasks.find(item => item.id === id && item.boardId === boardId);
};

const updateTask = async (id, boardId, task) => {
  const taskId = tasks.findIndex(
    item => item.boardId === boardId && item.id === id
  );
  if (taskId !== -1) {
    tasks[taskId] = task;
    tasks[taskId].id = id;
    tasks[taskId].boardId = boardId;
  }
  return tasks[taskId];
};

const deleteTask = async id => {
  tasks = tasks.filter(item => item.id !== id);
  return tasks;
};

const userNull = async id => {
  tasks = tasks.map(task => {
    if (task.userId === id) {
      task.userId = null;
    }
    return task;
  });
};

const deleteTaskByBoard = async boardId => {
  tasks = tasks.filter(task => task.boardId !== boardId);
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
