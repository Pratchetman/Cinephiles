const connection = require("../config/db");

class IndexController{
    //muestra el home
    home = (req, res) => {
        let sql = `SELECT * FROM user WHERE DELETED = 0;`;
        connection.query(sql, (error, result) => {
          if (error) throw error;
          res.render('index', { result });
        })

}
}
module.exports = new IndexController();