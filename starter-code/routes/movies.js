const express = require('express');
// add model
const Movie = require('../models/Movie');

const router = express.Router();

/* GET all movies
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


// render the edit form
router.get('/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      console.log('From the edit get route:', movie);
      res.render('movies/edit', { movie });
    })
    .catch((error) => {
      next(error);
    });
});

// Update the celebrity with info from the form
router.post('/:id/edit', (req, res, next) => {
  const { title, genre, plot } = req.body;

  // Find the book and update it with the info from the form
  Movie.findByIdAndUpdate(req.params.id, {
    title,
    genre,
    plot,
  })
    .then((movie) => {
      console.log(`Updated movie: ${req.params.id}`);
      res.redirect('/movies');
    })
    .catch((error) => {
      next(error);
    });
});

// Delete celebrity
router.get('/:id/delete', (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then((movie) => {
      res.redirect('/movies');
    })
    .catch((error) => {
      console.log('ERROR');
      next(error);
    });
});

module.exports = router;
