const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  listName: {
    type: String
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  isArchived: {
    type: Boolean
  },
  listIcon: {
    type: String
  }
});
module.exports = Usera = mongoose.model('lists', ListSchema);
