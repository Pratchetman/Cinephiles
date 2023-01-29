const connection = require("../config/db");

class IndexController{
    //muestra el home
    home = (req, res) => {
        let sql = `SELECT * FROM movie WHERE DELETED = 0 ORDER BY movie_id DESC limit 5;`;
        let sql2 = `SELECT * FROM user WHERE deleted = 0 order by user_id DESC limit 1;`;
        connection.query(sql, (error1, resultMovie) => {
          if (error1) throw error1;
          connection.query(sql2, (error2, resultUser) => {
            if (error2) throw error2;
            res.render('index', { resultMovie, resultUser });
          });
        });
}
}
module.exports = new IndexController();

