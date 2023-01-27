const connection = require("../config/db");

class MovieController{
    viewAddMovie = (req, res) => {
        let user_id = req.params.user_id;
        let sql = `SELECT * FROM user WHERE user_id = ${user_id} and deleted = false;`;
    
    connection.query(sql, (error, resultUser) => {
        if (error) throw error;
        res.render('addMovie', { resultUser, mensaje:"" });
    })    
    }

    addMovieTodb = (req, res) => {
        let { user_id, title, director, genre, release_year, text } = req.body
        let sql = `INSERT INTO movie ( user_id, title, director, genre, release_year, movie_description) VALUES ( ${user_id}, "${title}", "${director}", "${genre}", ${release_year}, "${text}");`;

        if (req.file != null){
            let movie_img = req.file.filename;
            sql = `INSERT INTO movie ( user_id, title, director, genre, release_year, movie_description, movie_img) VALUES ( ${user_id}, "${title}", "${director}", "${genre}", ${release_year}, "${text}", "${movie_img}");`;
        }
        console.log(req.body);
        console.log(sql);
        connection.query(sql, (error, result) =>{
            if (error) throw error;
            res.redirect(`/user/oneUser/${user_id}`);
        })
    }

    deleteMovie = (req, res) =>{
        let movie_id = req.params.movie_id;
        let user_id = req.params.user_id;
        let sql = `UPDATE movie SET deleted = 1 WHERE movie_id = ${movie_id};`;

        connection.query(sql, (error, result) => {
            if(error) throw error;
            res.redirect(`/user/oneUser/${user_id}`);
        })
    }
}
module.exports = new MovieController();