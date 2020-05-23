const mongoose = require('mongoose');

const Schema = mongoose.Schema;


/**
 * Basic understanding of modeling for mongodb data models can be learned from
 * 
 * https://www.youtube.com/watch?v=7CqJlxBYj-M
 * Jay
 */
const exerciseSchema = new Schema({
  username: { type: String, required: true },
  question: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  answer: { type: String, required: true },
}, {
  timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;