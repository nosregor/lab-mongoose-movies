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
