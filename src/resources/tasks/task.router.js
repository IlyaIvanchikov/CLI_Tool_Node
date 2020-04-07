const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const boardId = req.baseUrl.split('/')[2];
  const tasks = await tasksService.getAll(boardId);
  if (tasks.length !== 0) {
    return res.status(200).json(tasks.map(Task.toResponse));
  }
  return res.status(404).send('Access token is missing or invalid');
});

router.route('/').post(async (req, res) => {
  const boardId = req.baseUrl.split('/')[2];
  const task = new Task(req.body);
  const taskOne = await tasksService.saveTask(boardId, task);
  if (!task) {
    return res.status(404).send('Bad request');
  }
  return res.status(200).json(taskOne);
});

router.route('/:id').get(async (req, res) => {
  const tasks = await tasksService.getTask(req.params.id);
  if (tasks !== undefined) {
    return res.status(200).json(Task.toResponse(tasks));
  }
  return res.status(404).send('Access token is missing or invalid');
});

router.route('/:id').put(async (req, res) => {
  const task = new Task(req.body);
  const boardId = req.baseUrl.split('/')[2];
  const id = req.params.id;
  const taskOne = await tasksService.updateTask(id,  task);
  if (!taskOne || !boardId) {
    return res.status(404).send('Bad request');
  }
  return res.status(200).json(Task.toResponse(taskOne));
});

router.route('/:id').delete(async (req, res) => {
  const tasksAll = await tasksService.getAllTask();
  const boardId = req.baseUrl.split('/')[2];
  const tasks = await tasksService.deleteTask(req.params.id, boardId);
  if (tasks.length === tasksAll.length) {
    return res.status(404).send('Board not found');
  }
  return res.status(200).json(tasks);
});

module.exports = router;
