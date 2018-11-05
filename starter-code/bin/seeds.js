const mongoose = require('mongoose');
// 1. import movie model
const Celebrity = require('../models/Celebrity');

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

// Celebrity.create(celebrities, (err) => {
//   if (err) { throw (err); }
//   console.log(`Created ${celebrities.length} movies`);
//   mongoose.connection.close();
// });

// 4. Store celebrities in mongoDB
Celebrity.create(celebrities)
  .then((result) => {
    console.log(`Created ${result.length} movies`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log('An error happened:', err);
    mongoose.connection.close();
  });
