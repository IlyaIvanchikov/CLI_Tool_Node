// const uuid = require('uuid');

// class Task {
//   constructor({
//     id = uuid(),
//     title = 'USER',
//     order = 'order',
//     description = 'description',
//     userId = 'userId',
//     boardId = 'boardId',
//     columnId = 'columnId'
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }

//   static toResponse(task) {
//     const { id, title, order, description, userId } = task;
//     return { id, title, order, description, userId };
//   }
// }

// module.exports = Task;


const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
    alias: 'id'
  },
  title: String,
  order: Number,
  description: String,
  userId: String,
  boardId: String,
  columnId: String
},
{ versionKey: false }
);



taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId } = board;

  return { id, title, order, description, userId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;