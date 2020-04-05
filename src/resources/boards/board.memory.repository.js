const path = require('path');
const fs = require('fs');

const getAll = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, '..', '..', 'data', 'boards.json'),
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

const toJSON = board => {
  return {
    id: board.id,
    title: board.title,
    columns: board.columns,
  };
};

const saveBoard = async board => {
  const boards = await getAll();
  await boards.push(toJSON(board));
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, '..', '..', 'data', 'boards.json'),
      JSON.stringify(boards),
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(boards);
        }
      }
    );
  });
};

const getBoard = async id => {
  const boards = await getAll();
  return boards.find(item => item.id === id);
};

const updateBoard = async (id, board) => {
  const boards = await getAll();
  const boardId = boards.findIndex(item => item.id === id);
  if (boardId !== -1) {
    boards[boardId] = board;
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', '..', 'data', 'boards.json'),
        JSON.stringify(boards),
        err => {
          if (err) {
            reject(err);
          } else {
            resolve(board);
          }
        }
      );
    });
  }
  return;
};

const deleteBoard = async id => {
  const boards = await getAll();
  const boardId = boards.findIndex(item => item.id === id);
  if (boardId !== -1) {
    boards.splice(boardId, 1);
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', '..', 'data', 'boards.json'),
        JSON.stringify(boards),
        err => {
          if (err) {
            reject(err);
          } else {
            resolve(boards);
          }
        }
      );
    });
  }
  return boards;
};
module.exports = { getAll, getBoard, saveBoard, updateBoard, deleteBoard };
