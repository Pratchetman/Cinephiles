const connection = require("../config/db");

class MovieController {
  viewAddMovie = (req, res) => {
    let user_id = req.params.user_id;
    let sql = `SELECT * FROM user WHERE user_id = ${user_id} and deleted = false;`;

    connection.query(sql, (error, resultUser) => {
      if (error) throw error;
      res.render("addMovie", { resultUser, mensaje: "" });
    });
  };

  addMovieTodb = (req, res) => {
    let { user_id, title, director, genre, release_year, text } = req.body;
    let sql = `INSERT INTO movie ( user_id, title, director, genre, release_year, movie_description) VALUES ( ${user_id}, "${title}", "${director}", "${genre}", ${release_year}, "${text}");`;

    if (req.file != null) {
      let movie_img = req.file.filename;
      sql = `INSERT INTO movie ( user_id, title, director, genre, release_year, movie_description, movie_img) VALUES ( ${user_id}, "${title}", "${director}", "${genre}", ${release_year}, "${text}", "${movie_img}");`;
    }
    console.log(req.body);
    console.log(sql);
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/user/oneUser/${user_id}`);
    });
  };

  deleteMovie = (req, res) => {
    let movie_id = req.params.movie_id;
    let user_id = req.params.user_id;
    let sql = `UPDATE movie SET deleted = 1 WHERE movie_id = ${movie_id};`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/user/oneUser/${user_id}`);
    });
  };

  viewOneMovie = (req, res) => {
    let movie_id = req.params.movie_id;
    let sql = `SELECT * FROM movie WHERE movie_id = ${movie_id} AND deleted = false`;

    connection.query(sql, (error, result) =>{
      if (error) throw error;
      res.render('oneMovie', { result });
    })
  }


  viewEditMovie = (req, res) => {
    let movie_id = req.params.movie_id;
    let sql = `SELECT * FROM movie WHERE movie_id = ${movie_id} and deleted = false;`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editMovie", { result, mensaje:"" });
    });
  };

  editMovie = (req, res) => {
    let movie_id = req.params.movie_id;
    let {title, director, genre, release_year, text} = req.body;
    let sql = `UPDATE movie SET title = "${title}", director = "${director}", genre = "${genre}", release_year = ${release_year}, movie_description = "${text}" WHERE movie_id = ${movie_id};`;

    if(req.file != null){
      let movie_img = req.file.filename;
      sql = `UPDATE movie SET title = "${title}", director = "${director}", genre = "${genre}", release_year = ${release_year}, movie_description = "${text}", movie_img = "${movie_img}" WHERE movie_id = ${movie_id};`;
    }
    connection.query(sql, (error, result) =>{
      if (error) throw error;
      res.redirect(`/movies/oneMovie/${movie_id}`);
    })
  }

  viewAllMovies = (req, res) => {
    let sql = `SELECT * FROM movie WHERE deleted = false order by title asc`;
    connection.query(sql, (error, resultMovie) =>{
      if(error) throw error;
      res.render('allMovies', { resultMovie });
    })
  }

  searchMovies = (req, res) => {
    let movie = req.body.movie;
    let sql = `SELECT * FROM movie WHERE title LIKE "%${movie}%" AND deleted = false;`;
    connection.query(sql, (error, resultMovie) => {
      if (error) throw error;
      if (resultMovie.length == 0){
        res.render('searchMovie', { resultMovie, mensaje: "Ninguna película encontrada, inténtalo de nuevo."})
      }
      else{
        res.render('searchMovie', { resultMovie, mensaje:"" });
      }
      

    });
  }

}
module.exports = new MovieController();
