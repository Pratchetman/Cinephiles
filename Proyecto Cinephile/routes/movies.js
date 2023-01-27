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

module.exports = router;
