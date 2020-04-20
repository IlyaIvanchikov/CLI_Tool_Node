const router = require('express').Router();
const Board = require('./board.model');
const BoardsService = require('./board.service');
const { ErrorHandler } = require('../../common/allError');
const catchError = require('../../common/catchError');
const { NOT_FOUND, OK, NO_CONTENT } = require('http-status-codes');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const boards = await BoardsService.getAll();
      if (!boards) {
        throw new ErrorHandler(NOT_FOUND, 'Users are not found');
      }
      return res.status(OK).json(boards.map(Board.toResponse));
    })
  )
  .post(
    catchError(async (req, res) => {
      const { title, columns } = req.body;
      if (!title || !columns) {
        throw new ErrorHandler(NOT_FOUND, 'Boards are not found');
      }
      const boardOne = await BoardsService.saveBoard(req.body);
      return res.status(OK).json(Board.toResponse(boardOne));
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const board = await BoardsService.getBoard(req.params.id);
      if (!board) {
        throw new ErrorHandler(NOT_FOUND, 'Users are not found');
      }
      return res.status(OK).json(Board.toResponse(board));
    })
  )
  .put(
    catchError(async (req, res) => {
      const id = req.params.id;
      const updateBoards = await BoardsService.updateBoard(id, req.body);
      if (updateBoards !== null) {
        const updateBoardOne = await Board.findById(updateBoards.id);
        return res.status(OK).json(Board.toResponse(updateBoardOne));
      }
      throw new ErrorHandler(NOT_FOUND, 'Boards are not found');
    })
  )
  .delete(
    catchError(async (req, res) => {
      await BoardsService.deleteBoard(req.params.id);
      res.status(NO_CONTENT).json({ message: 'The user has been deleted' });
    })
  );

module.exports = router;
