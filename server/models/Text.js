const mongoose = require('mongoose');

const TextSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    default: '',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Text', TextSchema);
