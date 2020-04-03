const router = require('express').Router();
// const Border = require('./border.model');
const BoardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await BoardsService.getAll();
  if (boards.length !== 0) {
    return res.status(200).json(boards);
  }
  return res.status(401).send('Access token is missing or invalid');
});

module.exports = router;