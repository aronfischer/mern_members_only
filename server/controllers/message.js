const Message = require("../models/message");

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
