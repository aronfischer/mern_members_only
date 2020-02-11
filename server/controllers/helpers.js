const Message = require("../models/message");
const User = require("../models/user");

const helpersFuncs = {
  changeAuthorInMessagesByUserId: (req, res) => {
    console.log("REQUEST", req.body);
    // console.log("RESOLVE", res);
    console.log("REQUEST.USER._id", req.user._id);

    const userId = req.user._id;
    const { name } = req.body;

    User.findById(userId).exec((err, user) => {
      console.log("USER IS HERE", user);
      if (err || !user) {
        console.log("CHANGE AUTHOR IN MESSAGES BY USER ID ERROR", err);
        return res.json({
          error: "Error. User not found!"
        });
      }

      Message.find({ author: user.name }).exec((err, messages) => {
        console.log("HERE ARE THE USERS MESSAGES", messages);
        if (err || !messages) {
          console.log("CHANGE AUTHOR IN MESSAGES BY USER ID ERROR", err);
          return res.json({
            error: "No messages for this user found!"
          });
        }

        // save new Username in all Messages --> not working yet
        messages.forEach(message => {
          message.save((err, updatedMessage) => {
            if (err) {
              console.log("CHANGE AUTHOR IN MESSAGES ERROR", err);
              return res.status(400).json({
                error: "Author update failed!"
              });
            }
            res.json(updatedMessage);
          });
        });
      });
    });
  }
};

module.exports = helpersFuncs;
