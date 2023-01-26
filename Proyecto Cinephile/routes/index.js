var express = require('express');
var router = express.Router();
const IndexController = require("../controllers/indexController");

//localhost:3000/
router.get('/', IndexController.home);


module.exports = router;
