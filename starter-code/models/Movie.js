const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// 1. Create schema
const movieSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  plot: { type: String, required: true },
}, {
  timestamps: true,
});

// 2. Create a model so we can use it
const Movies = mongoose.model('Movie', movieSchema);

// make this available to our Node application
module.exports = Movies;
