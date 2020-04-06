const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const getAll = async boardId => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, '..', '..', 'data', 'tasks.json'),
      'utf-8',
      (err, content) => {
        if (err) {
          reject(err);
        } else {
          const tasks = JSON.parse(content);
          resolve(tasks.filter(item => item.boardId === boardId));
        }
      }
    );
  });
};

const getAllTask = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, '..', '..', 'data', 'tasks.json'),
      'utf-8',
      (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      }
    );
  });
};

const toJSON = (boardId, task) => {
  return {
    id: uuid(),
    title: task.title,
    order: task.order,
    description: task.description,
    userId: task.userId,
    boardId,
    columnId: task.columnId
  };
};

const saveTask = async (boardId, task) => {
  if (!task.title || !task.description) {
    return;
  }
  const tasks = await getAllTask();
  const taskOne = toJSON(boardId, task);
  await tasks.push(taskOne);
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, '..', '..', 'data', 'tasks.json'),
      JSON.stringify(tasks),
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(taskOne);
        }
      }
    );
  });
};

const getTask = async id => {
  const tasks = await getAllTask();
  return tasks.find(item => item.id === id);
};

const updateTask = async (id, task) => {
  if (!task.title || !task.description) {
    return;
  }
  const AllTask = await getAllTask();
  const taskId = AllTask.findIndex(item => item.id === id);
  AllTask[taskId] = task;
  if (taskId !== -1) {
    AllTask[taskId] = task;
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', '..', 'data', 'tasks.json'),
        JSON.stringify(AllTask),
        err => {
          if (err) {
            reject(err);
          } else {
            resolve(task);
          }
        }
      );
    });
  }
  return;
};

const deleteTask = async (id, boardId) => {
  const AllTask = await getAllTask();
  const taskId = AllTask.findIndex(
    item => item.id === id && item.boardId === boardId
  );
  if (taskId !== -1) {
    AllTask.splice(taskId, 1);
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', '..', 'data', 'tasks.json'),
        JSON.stringify(AllTask),
        err => {
          if (err) {
            reject(err);
          } else {
            resolve(AllTask);
          }
        }
      );
    });
  }
  return AllTask;
};
module.exports = {
  getAll,
  getTask,
  saveTask,
  updateTask,
  deleteTask,
  getAllTask
};
