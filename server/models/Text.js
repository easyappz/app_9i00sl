const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Text', textSchema);
