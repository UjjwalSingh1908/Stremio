//import all required packages here
const express = require("express");
const router = express.Router();

//middleware for protected routes
const isAuth=require('../middleware/isAuth')

//importing controllers 
const authController = require("../controllers/auth");
const checkemail=require('../helpers/checkemail');

//route for authentication
router.post("/signup", [checkemail.check_duplicate_email],authController.signup);
router.get("/confirmation/:email/:token",authController.confirmEmail);
router.post("/resend_verification_email",authController.resendemail);
router.post("/forgotpassword",authController.forgotPasswordLink);
router.get("/changepassword/:email/:token",authController.changepassword);
router.post("/renewAccessToken",authController.renewAccessToken);
router.post("/check",[isAuth],authController.check);
router.post("/login",authController.login);
module.exports = router;