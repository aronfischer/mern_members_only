const express = require("express");
const router = express.Router();

// import controllers
const { create, read } = require("../controllers/message");

// routes
router.post("/message", create);
router.get("/message", read);

module.exports = router;
