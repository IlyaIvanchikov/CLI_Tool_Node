const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const tasksAll = require('../../data/tasks').tasks;
const responseForClient = require('../../common/allError');

router.route('/:boardId/tasks/').get(async (req, res) => {
  const boardId = req.params.boardId;
  const tasks = await tasksService.getAll(boardId);
  if (tasks.length === 0) {
    return responseForClient(404, res);
  }
  return res.status(200).json(tasks);
});

router.route('/:boardId/tasks/').post(async (req, res) => {
  const task = new Task(req.body);
  const boardId = req.params.boardId;
  const taskOne = await tasksService.saveTask(boardId, task);
  if (!task) {
    return responseForClient(404, res);
  }
  return res.status(200).json(taskOne);
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  const task = await tasksService.getTask(req.params.id, req.params.boardId);
  if (task !== undefined) {
    return res.status(200).json(task);
  }
  return responseForClient(404, res);
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  const task = req.body;
  const boardId = req.params.boardId;
  const id = req.params.id;
  const taskOne = await tasksService.updateTask(id, boardId, task);
  if (!taskOne || !boardId) {
    return responseForClient(404, res);
  }
  return res.status(200).json(taskOne);
});

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  const id = req.params.id;
  const boardId = req.params.boardId;
  await tasksService.deleteTask(id);
  return res.status(204).json({ message: 'The user has been deleted' });
});

module.exports = router;
