const express = require("express");
const router = express.Router();

// import controllers
const {
  signupWithoutEmailVerification,
  accountActivation,
  signup,
  signin
} = require("../controllers/auth");

// import validators
const { runValidation } = require("../validators/index");
const {
  userSignupValidator,
  userSigninValidator
} = require("../validators/auth");

router.post(
  "/signup-without-email",
  userSignupValidator,
  runValidation,
  signupWithoutEmailVerification
); // Signup without getting an email sent
router.post("/signup", userSignupValidator, runValidation, signup); // Signup with getting an email sent
router.post("/account-activation", accountActivation);
router.post("/signin", userSigninValidator, runValidation, signin); // Signup without getting an email sent

module.exports = router;
