const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
    alias: 'id'
  },
  title: String,
  order: Number
});

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: [columnSchema]
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  const columnsToResponse = columns.map(column => ({
    id: column._id,
    title: column.title,
    order: column.order
  }));
  return { id, title, columns: columnsToResponse };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
