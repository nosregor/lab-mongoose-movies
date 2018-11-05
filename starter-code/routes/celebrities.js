const express = require('express');
// add model
const Celebrity = require('../models/Celebrity');

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
  res.render('celebrities/new');
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

  const newCelebrity = new Celebrity({ name, occupation, catchPhrase });
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
      console.log('From the edit get route:', celebrity);
      res.render('celebrities/edit', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

// Update the celebrity with info from the form
router.post('/:id/edit', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  // Find the book and update it with the info from the form
  Celebrity.findByIdAndUpdate(req.params.id, {
    name,
    occupation,
    catchPhrase,
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
