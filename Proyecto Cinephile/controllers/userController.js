const connection = require("../config/db");
const bcrypt = require("bcrypt");

class UserController {
  viewAllUsers = (req, res) => {
    let sql = "SELECT * FROM user WHERE deleted = false ORDER BY user_id DESC";
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
  
  viewlogin = (req, res) => {
    res.render("login", { mensaje: ""});
    
  }

  login = (req, res) => {
    let { email, password } = req.body;
    let sql = `SELECT * FROM user WHERE user_email = "${email}" AND deleted = false;`;
    connection.query(sql, (error, resultmail) =>{
      if (error) throw error;
      if (resultmail.length == 1) {
        let hash = resultmail[0].user_password;
        bcrypt.compare(password, hash, function (err, result){
          if (err) throw err;
          if (result) {
            res.redirect(`/user/oneUser/${resultmail[0].user_id}`);
          } else {
            res.render('login', { mensaje : "Nombre de usuario o contraseña incorrectos."});
          }
        });
      } else {
        res.render('login', { mensaje : "Nombre de usuario o contraseña incorrectos."});
      }
    });
  };

  deleteUser = (req, res) => {
    let user_id = req.params.user_id;
    let sql = `SELECT * FROM user WHERE user_id = "${user_id}";`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      if (result.length == 1) {
        let password = req.body.password;
        let hash = result[0].user_password;
        bcrypt.compare(password, hash, function (err, resultHash){
          if (err) throw err;
          if (resultHash) {
            let sql2 = `UPDATE user LEFT JOIN movie ON user.user_id = movie.user_id SET user.deleted = true , movie.deleted = true WHERE user.user_id = ${user_id};`;
            connection.query(sql2, (error2, resultDel) =>{
              if (error2) throw error2;
              res.redirect("/user");
            })
          } else {
            res.render('editUser', { result, mensaje: "Contraseña incorrecta."})
          }
        })
      }
    })
  }
}
module.exports = new UserController();
