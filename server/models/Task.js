const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  task_name: {
    type: String
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  isCompleted: {
    type: Boolean
  }
});
module.exports = User = mongoose.model('tasks', TaskSchema);
