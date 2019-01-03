const express = require('express');
// add model
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');
const MovCeleb = require('../models/MovCeleb.js');
const ObjectId = require('mongodb').ObjectID;

const router = express.Router();

/* GET all celebrities
celebrities/index.html */
router.get('/', (req, res, next) => {
  Celebrity.find({})
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => {
      console.log(error);
    });
});

/* render form */
router.get('/new', (req, res, next) => {
  Movie.find({}, null, { sort: { name: 1 } })
    .then((movies) => {
      res.render('celebrities/new', { movies });
    });
});


// Create a celebrity with the information from the form
router.post('/new', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  // If there is an empty title
  // if (!name) {
  //   res.render('new', {
  //     error: 'The name must be filled',
  //   });
  //   return;
  // }
  // this is one option
  // Celebrities.create({
  //   name,
  //   occupation,
  //   catchPhrase,
  // })

  const newCelebrity = new Celebrity({
    name, occupation, catchPhrase, _movies,
  });
  newCelebrity.save()
    .then((celebrity) => {
      res.redirect(`/celebrities/${celebrity._id}`);
    })
    .catch((error) => {
      res.send(error);
    });
});


/* Show details of a celebrity */
// celebrities/:id
router.get('/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .populate('_movies') // change the field "_movie" by the full document
    .then((celebrity) => {
      res.render('celebrities/show', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});


// render the edit form
router.get('/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      Movie.find({}, null, { sort: { name: 1 } })
        .then((movies) => {
          res.render('celebrities/edit', { celebrity, movies });
        });

      console.log('From the edit get route:', celebrity);
    })
    .catch((error) => {
      next(error);
    });
});

// Update the celebrity with info from the form
router.post('/:id/edit', (req, res, next) => {
  const {
    name, occupation, catchPhrase, _movies,
  } = req.body;

  // Find the book and update it with the info from the form
  Celebrity.findByIdAndUpdate(req.params.id, {
    name,
    occupation,
    catchPhrase,
    _movies,
  })
    .then((celebrity) => {
      console.log(`Updated celebrity: ${req.params.id}`);
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

// Delete celebrity
router.get('/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then((celebrity) => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      console.log('ERROR');
      next(error);
    });
});

module.exports = router;
