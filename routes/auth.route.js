const express = require("express");
const router =express.Router();


// load controllers
const{
  registerController,
  activationController,
  forgotPasswordController,
  signinController, 
  resetPasswordController
} =require('../controllers/auth.controller')

// Validation 
const {
  validSign,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator
}= require('../helpers/valid')



router.post('/register',validSign,registerController)

router.post('/login', validLogin, signinController)

router.post('/activation', activationController)

router.put('/forgotpassword', forgotPasswordValidator, forgotPasswordController)

router.put('/resetpassword', resetPasswordValidator, resetPasswordController);


module.exports = router;