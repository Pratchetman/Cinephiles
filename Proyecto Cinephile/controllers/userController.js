const connection = require("../config/db");

class UserController{

    viewAllUsers = (req, res) => {
        let sql = "SELECT * FROM user WHERE deleted = false";
        connection.query(sql, (error, result) => {
            if (error) throw error;
            res.render('allUsers', { result });
          })
    }

    addUser = (req, res) => {
        res.render('addUser', { mensaje:""});
    }
}

module.exports = new UserController();