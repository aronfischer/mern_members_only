const express = require("express");
const router = express.Router();

// import controllers
const { create, read, getUsersMessages } = require("../controllers/message");

// routes
router.post("/message", create);
router.get("/message/:userId", getUsersMessages);
router.get("/message", read);

module.exports = router;
