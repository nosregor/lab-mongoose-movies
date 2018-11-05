const mongoose = require('mongoose');
// 1. import movie model
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

// 2. Connect to mongoDB
const dbName = 'movieDB2';
mongoose.connect(`mongodb://localhost/${dbName}`);

// 3. Create celebrity objects
const celebrities = [
  {
    name: 'Brad Pitt',
    occupation: 'Actor',
    catchPhrase: 'Welcome to Fight Club.The first rule of Fight Club is: you do not talk about Fight Club.The second rule of Fight Club is: you do not talk about Fight Club!',
  },
  {
    name: 'Angelina Jolie',
    occupation: 'Actress',
    catchPhrase: "I've been reckless, but I'm not a rebel without a cause.",
  },
  {
    name: 'Tom Cruise',
    occupation: 'Actor',
    catchPhrase: 'Show Me the Money!',
  },
];


const movies = [
  {
    title: 'A Wrinkle in Time',
    genre: 'Advernture',
    plot: 'Something...',
  },
  {
    title: 'The Strangers: Prey at Night',
    genre: 'Comedie',
    plot: 'Something...',
  },
  {
    title: 'The Hurricane Heist',
    genre: 'Drama',
    plot: 'Something...',
  },
  {
    title: 'Gringo',
    genre: 'Horror',
    plot: 'Something...',
  },
  {
    title: 'Black Panther',
    genre: 'Adventure',
    plot: 'Something...',
  },
  {
    title: 'Red Sparrow',
    genre: 'Mystery',
    plot: 'Something...',
  },
];


// Celebrity.create(celebrities, (err) => {
//   if (err) { throw (err); }
//   console.log(`Created ${celebrities.length} movies`);
//   mongoose.connection.close();
// });

// 4. Store celebrities in mongoDB
Celebrity.create(celebrities)
  .then((result) => {
    console.log(`Created ${result.length} movies`);
  })
  .catch((err) => {
    console.log('An error happened:', err);
    mongoose.connection.close();
  });

Movie.create(movies)
  .then((result) => {
    console.log(`Created ${result.length} movies`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log('An error happened:', err);
    mongoose.connection.close();
  });
