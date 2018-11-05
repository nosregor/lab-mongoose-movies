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

module.exports = router;
