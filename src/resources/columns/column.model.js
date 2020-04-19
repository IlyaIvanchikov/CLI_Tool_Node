const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  title: String,
  order: Number,
  board: [{
    type: Schema.types.ObjectId,
    ref: 'Board'
  }]
});

const Column = mongoose.model('Column', columnSchema);
module.exports = Column;
