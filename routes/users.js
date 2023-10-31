var express = require('express');
var router = express.Router();
var userController=require('../controller/userController')
var userMiddleware=require('../middleware/user')

/* GET users listing. */
router.post('/signUp', userController.createUser);
router.post('/signIn', userController.loginUser);

module.exports = router;
 