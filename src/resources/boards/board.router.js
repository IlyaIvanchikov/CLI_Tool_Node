const router = require('express').Router();
const Board = require('./board.model');
const BoardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await BoardsService.getAll();
  if (boards.length !== 0) {
    return res.status(200).json(boards);
  }
  return res.status(401).send('Access token is missing or invalid');
});

router.route('/').post(async (req, res) => {
  const board = await new Board(req.body);
  if (board !== undefined) {
    await BoardsService.saveBoard(board);
    const boards = await BoardsService.getBoard(board.id);
    return res.status(200).json(boards);
  }
  return res.status(400).send('Bad request');
});

router.route('/:id').get(async (req, res) => {
  const boards = await BoardsService.getBoard(req.params.id);
  if (boards !== undefined) {
    return res.status(200).json(boards);
  } else {
    return res.status(404).send('Access token is missing or invalid');
  }
});

router.route('/:id').put(async (req, res) => {
  const board = new Board(req.body);
  const id = req.params.id;
  const boardOne = await BoardsService.updateBoard(id, board);
  if ( boardOne !== undefined) {
    return res.status(200).json(boardOne);
  }
  else {
    return res.status(400).send('Bad request');
  }
});

router.route('/:id').delete(async (req, res) => {
  const boardsAll = await BoardsService.getAll();
  const boards = await BoardsService.deleteBoard(req.params.id);
  console.log(boards);
  if (boards.length === boardsAll.length) {
    return res 
      .status(404)
      .send('Board not found')
  } else {
    return res.status(200).json(boards);
  }
});

module.exports = router;
