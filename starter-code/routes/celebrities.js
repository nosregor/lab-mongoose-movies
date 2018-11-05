const express = require('express');
// add model
const Celebrities = require('../models/Celebrity');

const router = express.Router();

/* GET celebrities page */
router.get('/', (req, res, next) => {
  Celebrities.find({})
    .then((celebritiesFromDb) => {
      res.render('celebrities/index', { celebritiesFromDb });
    })
    .catch((error) => {
      console.log(error);
    });
});

/* route displays the POST form */
router.get('/new', (req, res, next) => {
  res.render('celebrities/new');
});


router.post('/new', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrities.create({
    name,
    occupation,
    catchPhrase,
  })
    .then((celebrity) => {
      res.redirect(`/celebrities/${celebrity._id}`);
    })
    .catch((error) => {
      res.send(error);
    });
});


/* GET celebrity page */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  Celebrities.findById(id)
    .then((celebrityFromDb) => {
      res.render('celebrities/show', { celebrityFromDb });
    })
    .catch((error) => {
      console.log(error);
    });
});


module.exports = router;
