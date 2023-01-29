var express = require('express');
const multer = require("../middleware/multer");
const movieController = require("../controllers/moviesController");
var router = express.Router();


//localhost:3000/movies/addMovie/:user_id
router.get('/addMovie/:user_id', movieController.viewAddMovie);

//localhost:3000/movies/addMovie/
router.post('/addMovie/', multer("movies"), movieController.addMovieTodb);

//localhost:3000/movies/deleteMovie/:user_id/:movie_id
router.get('/deleteMovie/:user_id/:movie_id', movieController.deleteMovie);

//localhost:3000/movies/oneMovie/:movie_id
router.get('/oneMovie/:movie_id', movieController.viewOneMovie);

//localhost:3000/movies/editMovie/:movie_id
router.get('/editMovie/:movie_id', movieController.viewEditMovie);

//localhost:3000/movies/editMovie/:movie:id
router.post('/editMovie/:movie_id', multer("movies"), movieController.editMovie);

//localhost:3000/movies/allMovies
router.get('/allMovies', movieController.viewAllMovies);

//localhost:3000/movies/searchMovies
router.post('/searchMovies', movieController.searchMovies);

module.exports = router;
