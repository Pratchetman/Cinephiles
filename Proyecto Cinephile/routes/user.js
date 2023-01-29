var express = require('express');
const userController = require('../controllers/userController');
const multer = require('../middleware/multer');
var router = express.Router();


//localhost:3000/user
router.get('/', userController.viewAllUsers);

//localhost:3000/user/addUser
router.get('/addUser', userController.addUser);

//localhost:3000/user/addUser
router.post('/addUser',multer("user"), userController.addUserTodb);

//localhost:3000/user/oneUser/:user_id
router.get('/oneUser/:user_id', userController.viewOneUser);

//localhost:3000/user/oneUser/editUser/:user_id
router.get('/oneUser/editUser/:user_id', userController.viewEditUser);

//localhost:3000/user/oneUser/editUser/:user_id
router.post('/oneUser/editUser/:user_id', multer("user"), userController.editUserTodb);

//localhost:3000/user/login
router.get('/login', userController.viewlogin);

//localhost:3000/user/login
router.post('/login', userController.login);

//localhost:3000/user/deleteUser/:user_id
router.post('/deleteUser/:user_id', userController.deleteUser);

module.exports = router;
