const express = require('express');
// add model
const Movie = require('../models/Movie');

const router = express.Router();

/* GET all celebrities
movies/index.html */
router.get('/', (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render('movies/index', { movies });
    })
    .catch((error) => {
      console.log(error);
    });
});

/* render form */
router.get('/new', (req, res, next) => {
  res.render('movies/new');
});

// Create a celebrity with the information from the form
router.post('/new', (req, res, next) => {
  const { title, genre, plot } = req.body;
  // If there is an empty title
  if (!title) {
    res.render('new', {
      error: 'The title must be filled',
    });
    return;
  }
  Movie.create({ title, genre, plot })
    .then((movie) => {
      res.redirect(`/movies/${movie._id}`);
    })
    .catch((error) => {
      res.send(error);
    });
});


router.get('/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      res.render('movies/show', { movie });
    })
    .catch((error) => {
      console.log(error);
    });
});


module.exports = router;
