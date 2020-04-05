const uuid = require('uuid');
const Column = require('../columns/column.model');
class Board {
  constructor({ id = uuid(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((item, index) => {
      return new Column(item);
    })
  }
}

module.exports = Board;
