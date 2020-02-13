const express = require("express");
const router = express.Router();

// import controllers
const {
  create,
  read,
  getUsersMessages,
  deleteUsersMessage
} = require("../controllers/message");

// routes
router.post("/message", create);
router.get("/message/:userId", getUsersMessages);
router.delete("/message/:userId", deleteUsersMessage);
router.get("/message", read);

module.exports = router;
