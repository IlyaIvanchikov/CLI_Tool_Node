const router = require('express').Router();
const Board = require('./board.model');
const BoardsService = require('./board.service');
const { ErrorHandler } = require('../../common/allError');
const catchError = require('../../common/catchError');
const {
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
  NO_CONTENT
} = require('http-status-codes');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const boards = await BoardsService.getAll();
      if (boards.length !== 0) {
        return res.status(OK).json(boards);
      }
      throw new ErrorHandler(NOT_FOUND, 'Users are not found');
    })
  )
  .post(
    catchError(async (req, res) => {
      const board = await new Board(req.body);
      if (board !== undefined) {
        await BoardsService.saveBoard(board);
        return res.status(OK).json(board);
      }
      throw new ErrorHandler(NOT_FOUND, 'Users are not found');
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const board = await BoardsService.getBoard(req.params.id);
      if (board !== undefined) {
        return res.status(OK).json(board);
      }
      throw new ErrorHandler(NOT_FOUND, 'Users are not found');
    })
  )
  .put(
    catchError(async (req, res) => {
      const board = new Board(req.body);
      const id = req.params.id;
      const boardOne = await BoardsService.updateBoard(id, board);
      if (boardOne !== undefined) {
        return res.status(OK).json(boardOne);
      }

      throw new ErrorHandler(
        UNAUTHORIZED,
        '	Access token is missing or invalid'
      );
    })
  )
  .delete(
    catchError(async (req, res) => {
      const boardsAll = await BoardsService.getAll();
      const boards = await BoardsService.deleteBoard(req.params.id);
      if (boards.length !== boardsAll.length) {
        return res.status(NO_CONTENT).json(boards);
      }
      throw new ErrorHandler(
        UNAUTHORIZED,
        '	Access token is missing or invalid'
      );
    })
  );

module.exports = router;
