const express = require("express");
const router = express.Router();

// import controllers
const { create } = require("../controllers/message");

// routes
router.post("/create-message", create);

module.exports = router;
