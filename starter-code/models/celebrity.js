const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// 1. Create schema
const celebritySchema = new Schema({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  catchPhrase: { type: String, required: true },
  _movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
},
{
  timestamps: true,
});

// 2. Create a model so we can use it
const Celebrity = mongoose.model('Celebrity', celebritySchema);

// make this available to our Node application
module.exports = Celebrity;
