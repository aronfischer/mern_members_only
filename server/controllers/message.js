const Message = require("../models/message");
const User = require("../models/user");

exports.create = (req, res) => {
  console.log("REQ-BODY", req.body);
  const { author, message, date } = req.body;
  const newMessage = new Message({
    author,
    message
  });

  newMessage.save((err, success) => {
    if (err) {
      console.log("SAVE NEW USER IN DATABASE ERROR", err);

      return res.status(400).json({
        error: "Faild to send message, please try again later!"
      });
    } else {
      return res.json({
        message: "Message submitted successfully"
      });
    }
  });
};

exports.read = (req, res) => {
  Message.find()
    .then(response => {
      return res.json(response);
    })
    .catch(error => {
      console.log("GETTING MESSAGES FROM DATABASE ERROR", error);
    });
};

exports.getUsersMessages = (req, res) => {
  const { userId } = req.params;

  // Get user with userId
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      console.log("USER FOUND ERROR IN GET USER BY MESSAGES", err);
      return res.status(400).json({
        error: "User with this id not found!"
      });
    }

    if (user) {
      Message.find({ author: user.name }).exec((error, messages) => {
        if (error || !messages) {
          console.log("MESSAGE FOUND ERROR IN GET USER BY MESSAGES", error);
          return res.status(400).json({
            error: "User with this id doesn't have messages!"
          });
        }
        // return messages
        res.json(messages);
      });
    }
  });
};
