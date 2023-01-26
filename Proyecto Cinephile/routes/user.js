var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

//localhost:3000/user
router.get('/', userController.viewAllUsers);

//localhost:3000/user/addUser
router.get('/addUser', userController.addUser);

module.exports = router;
