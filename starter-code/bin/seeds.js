// To execute this file:
//   $ node bin/seeds.js

const mongoose = require('mongoose');
// 1. import movie model
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

// 2. Connect to mongoDB
const dbName = 'movieDB2';
mongoose.connect(`mongodb://localhost/${dbName}`);

// 3. Create movies then celebrity objects
const movies = [
  {
    title: 'Top Gun ',
    genre: 'Advernture',
    plot: 'Something...',
  },
  {
    title: 'Mr. & Mrs. Smith',
    genre: 'Comedie',
    plot: 'Something...',
  },
  {
    title: 'Mission Impossible 1',
    genre: 'Drama',
    plot: 'Something...',
  },
  {
    title: 'Mission Impossible 2',
    genre: 'Horror',
    plot: 'Something...',
  },
  {
    title: 'Fight Club',
    genre: 'Adventure',
    plot: 'Something...',
  },
  {
    title: 'Red Sparrow',
    genre: 'Mystery',
    plot: 'Something...',
  },
];

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


// Celebrity.create(celebrities, (err) => {
//   if (err) { throw (err); }
//   console.log(`Created ${celebrities.length} movies`);
//   mongoose.connection.close();
// });

// 4. Store celebrities in mongoDB
Movie.create(movies)
  .then((result) => {
    console.log(`Created ${result.length} movies`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log('An error happened:', err);
    mongoose.connection.close();
  });

Celebrity.create(celebrities)
  .then((celebrities) => {
    console.log(`Created ${celebrities.length} celebrities`);
  })
  // Movie.find()
  // .then((movies) => {
  // celebrities[0]._movies = movies[0]._id;
  // celebrities[0]._movies.push(movies[0]._id);
  // celebrities[0]._movies.push(movies[1]._id);
  // console.log(celebrities[0]._movies);
  // return celebrities[0].save();
  // });
  .catch((err) => {
    console.log('An error happened:', err);
    mongoose.connection.close();
  });


// If we want to seed publishers and books at the same time and link them
// 1) Publisher.create(publishers)
// 2) // books[i]._publisher is equal to an id (inside Publisher.create)
// 3) Book.create(books) // (inside Publisher.create)
