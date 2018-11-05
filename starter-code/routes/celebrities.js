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
    .catch(err => next(err));
});

module.exports = router;
