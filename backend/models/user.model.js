
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Basic understanding of modeling for mongodb data models can be learned from
 * 
 * https://www.youtube.com/watch?v=7CqJlxBYj-M
 * Jay
 */
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  score: {
    type: Number,
    required: true

  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;