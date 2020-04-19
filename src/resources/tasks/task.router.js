const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');
const { ErrorHandler } = require('../../common/allError');
const catchError = require('../../common/catchError');
const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');

router
  .route('/:boardId/tasks/')
  .get(
    catchError(async (req, res) => {
      const boardId = req.params.boardId;
      const tasks = await tasksService.getAll(boardId);
      if (!tasks) {
        throw new ErrorHandler(NOT_FOUND, 'Users are not found');
      }
      return res.status(OK).json(tasks.map(Task.toResponse));
    })
  )
  .post(
    catchError(async (req, res) => {
      // const task = new Task(req.body);
      // const boardId = req.params.boardId;
      // const taskOne = await tasksService.saveTask(boardId, task);
      // if (!task) {
      //   throw new ErrorHandler(NOT_FOUND, 'Users are not found');
      // }
      // return res.status(OK).json(taskOne);
      const { title, order, description } = req.body;
      if (!title || !description || !order) {
        throw new ErrorHandler(NOT_FOUND, 'Tasks are not found');

      }
      const taskOne = await tasksService.saveTask(boardId, req.body);
      return res.status(OK).json(taskOne);
    })
  );

router
  .route('/:boardId/tasks/:id')
  .get(
    catchError(async (req, res) => {
      const task = await tasksService.getTask(
        req.params.id,
        req.params.boardId
      );
      if (task !== undefined) {
        return res.status(OK).json(task);
      }
      throw new ErrorHandler(NOT_FOUND, 'Users are not found');
    })
  )
  .put(
    catchError(async (req, res) => {
      const task = req.body;
      const boardId = req.params.boardId;
      const id = req.params.id;
      const taskOne = await tasksService.updateTask(id, boardId, task);
      if (!taskOne || !boardId) {
        throw new ErrorHandler(NOT_FOUND, 'Users are not found');
      }
      return res.status(OK).json(taskOne);
    })
  )
  .delete(
    catchError(async (req, res) => {
      const id = req.params.id;
      await tasksService.deleteTask(id);
      return res
        .status(NO_CONTENT)
        .json({ message: 'The user has been deleted' });
    })
  );

module.exports = router;
