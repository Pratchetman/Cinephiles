const connection = require("../config/db");
const bcrypt = require("bcrypt");

class UserController {
  viewAllUsers = (req, res) => {
    let sql = "SELECT * FROM user WHERE deleted = false";
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("allUsers", { result });
    });
  };

  addUser = (req, res) => {
    res.render("addUser", { mensaje: "" });
  };

  addUserTodb = (req, res) => {
    let { name, last_name, phone_number, text, email, password } = req.body;
    bcrypt.hash(password, 10, function (berror, hash) {
      if (berror) throw berror;
      let sql = `INSERT into user ( user_name, user_last_name, phone_number, user_description, user_email, user_password ) VALUES ( "${name}", "${last_name}", "${phone_number}", "${text}", "${email}", "${hash}");`;

      if (req.file != null) {
        let user_img = req.file.filename;
        sql = `INSERT into user ( user_name, user_last_name, phone_number, user_description, user_email, user_password, user_img ) VALUES ( "${name}", "${last_name}", "${phone_number}", "${text}", "${email}", "${hash}", "${user_img}");`;
      }
        console.log(text);
      connection.query(sql, (error, result) => {
        if (error) {
          if (error.code == "ER_DUP_ENTRY") {
            res.render("addUser", {
              mensaje:
                "El mail introducido ya existe en nuestra base de datos.",
            });
          } else {
            throw error;
          }
        } else {
          console.log(result);
          res.redirect("/user");
        }
      });
    });
  };

  viewOneUser = (req, res) => {
    let user_id = req.params.user_id;
    let sql1 = `SELECT * FROM user WHERE user_id = ${user_id} AND deleted = false;`;
    let sql2 = `SELECT * FROM movie WHERE user_id = ${user_id} AND deleted = false ORDER BY movie_id DESC;`;

    connection.query(sql1, (error1, resultUser) => {
      if (error1) throw error1;
      connection.query(sql2, (error2, resultMovie) => {
        if (error2) throw error2;
        res.render("oneUser", { resultUser, resultMovie });
      });
    });
  };

  viewEditUser = (req, res) => {
    let user_id = req.params.user_id;
    let sql = `SELECT * FROM user WHERE user_id = ${user_id} AND deleted = false;`

    connection.query(sql, (error, result) => {
        if (error) throw error;
        res.render('editUser', { result, mensaje: "" });
    });
  };

  editUserTodb = (req, res) => {
    let user_id = req.params.user_id
    let { name, last_name, phone_number, text } = req.body;
    let sql = `UPDATE user SET user_name = "${name}", user_last_name = "${last_name}", phone_number = "${phone_number}", user_description = "${text}" WHERE user_id = ${user_id};`;
    if(req.file != null){
        let user_img = req.file.filename;
        sql = `UPDATE user SET user_name = "${name}", user_last_name = "${last_name}", phone_number = "${phone_number}", user_description = "${text}", user_img = "${user_img}" WHERE user_id = ${user_id};`
    }
    connection.query(sql, (error, result) => {
        if (error) throw error;
        res.redirect(`/user/oneUser/${user_id}`);

    })
  }
}
module.exports = new UserController();
