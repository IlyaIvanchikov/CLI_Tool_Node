const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const { ErrorHandler } = require('../../common/allError');
const catchError = require('../../common/catchError');
const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');

router
  .route('/')
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
      const boardId = req.params.boardId;
      const { title } = req.body;
      if (!title) {
        throw new ErrorHandler(NOT_FOUND, 'Tasks are not found');
      }
      const taskOne = await tasksService.saveTask(boardId, {
        ...req.body,
        boardId
      });
      return res.status(OK).json(Task.toResponse(taskOne));
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const task = await tasksService.getTask(
        req.params.id,
        req.params.boardId
      );
      if (!task) {
        throw new ErrorHandler(NOT_FOUND, 'Users are not found');
      }
      return res.status(OK).json(Task.toResponse(task));
    })
  )
  .put(
    catchError(async (req, res) => {
      const task = req.body;
      const boardId = req.params.boardId;
      const id = req.params.id;
      const taskOne = await tasksService.updateTask(id, boardId, task);
      if (taskOne !== null) {
        const updateTaskOne = await Task.findById(taskOne.id);
        return res.status(OK).json(Task.toResponse(updateTaskOne));
      }
      throw new ErrorHandler(NOT_FOUND, 'Users are not found');
    })
  )
  .delete(
    catchError(async (req, res) => {
      const boardId = req.params.boardId;
      const id = req.params.id;
      await tasksService.deleteTask(id, boardId);
      res.status(NO_CONTENT).json({ message: 'The user has been deleted' });
    })
  );

module.exports = router;
