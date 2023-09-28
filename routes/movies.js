var express = require('express');
var router = express.Router();


const Movie = require('../models/Movie')
const Celebrity = require('../models/Celebrity')


router.get('/add-movie', (req, res, next) => {
    Celebrity.find()
        .then((celebrities) => {

            res.render('movies/new-movie', {celebrities})
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
})

router.post('/add-movie', (req, res, next) =>{
     console.log(req.body);

     let newMovie = req.body;
     Movie.create(newMovie)
        .then((newMovie) => {
            console.log('Created Movie ===>',newMovie);
            res.redirect('/movies')
        })
})


router.get('/', (req,res, next) => {

    Movie.find()
        .then(movies =>{
            res.render('movies/movies', {movies})
        })
        .catch(err => {
            console.log(err);
            next(err);
        })
})


router.get('/details/:movieID', (req, res, next) =>{
    Movie.findById(req.params.movieID)
    .populate('cast')
    .then(movie => {
        console.log('Found Movie ===>', movie);
        res.render('movies/movie-details', movie)
    })
})

module.exports = router;
