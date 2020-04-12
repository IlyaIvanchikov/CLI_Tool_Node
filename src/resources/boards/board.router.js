const router = require('express').Router();
const Board = require('./board.model');
const BoardsService = require('./board.service');
const responseForClient = require('../../common/allError');


router.route('/').get(async (req, res) => {
  const boards = await BoardsService.getAll();
  if (boards.length !== 0) {
    return res.status(200).json(boards);
  }
  return responseForClient(401, res);
});

router.route('/').post(async (req, res) => {
  const board = await new Board(req.body);
  if (board !== undefined) {
    await BoardsService.saveBoard(board);
    return res.status(200).json(board);
  }
  return responseForClient(400, res);
});

router.route('/:id').get(async (req, res) => {
  const board = await BoardsService.getBoard(req.params.id);
  if (board !== undefined) {
    return res.status(200).json(board);
  }
  return responseForClient(404, res);
});

router.route('/:id').put(async (req, res) => {
  const board = new Board(req.body);
  const id = req.params.id;
  const boardOne = await BoardsService.updateBoard(id, board);
  if (boardOne !== undefined) {
    return res.status(200).json(boardOne);
  }

  return responseForClient(400, res);
});

router.route('/:id').delete(async (req, res) => {
  const boardsAll = await BoardsService.getAll();
  const boards = await BoardsService.deleteBoard(req.params.id);
  if (boards.length !== boardsAll.length) {
    return res.status(200).json(boards);
  }
  return responseForClient(404, res);
});

module.exports = router;
