const express = require("express");
const router = express.Router();

// import controllers
const { signupWithoutEmailVerification } = require("../controllers/auth");

// import validators
const { runValidation } = require("../validators/index");
const { userSignupValidator } = require("../validators/auth");

router.post(
  "/signup",
  userSignupValidator,
  runValidation,
  signupWithoutEmailVerification
); // Signup without getting an email sent

module.exports = router;
