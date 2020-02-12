const Message = require("../models/message");
const User = require("../models/user");

const helpersFuncs = {
  changeAuthorInMessagesByUserId: (req, res) => {
    const userId = req.user._id;
    const { name } = req.body;

    User.findById(userId).exec((err, user) => {
      //   console.log("USER IS HERE", user);

      if (err || !user) {
        console.log("CHANGE AUTHOR IN MESSAGES BY USER ID ERROR", err);
        return res.json({
          error: "Error. User not found!"
        });
      }

      Message.find({ author: user.name }).exec((err, messages) => {
        // console.log("HERE ARE THE USERS MESSAGES", messages);
        if (err || !messages) {
          console.log("CHANGE AUTHOR IN MESSAGES BY USER ID ERROR", err);
          return res.json({
            error: "No messages for this user found!"
          });
        }

        // save new Username in all Messages --> not working yet
        messages.forEach(message => {
          //   console.log("MESSAGE", message);
          //   console.log("NAME", name); // neu
          //   console.log("USER.NAME", user.name); //alt

          message.author = name;

          message.save((err, updatedMessage) => {
            if (err) {
              console.log("CHANGE AUTHOR IN MESSAGES ERROR", err);
              return res.status(400).json({
                error: "Author update failed!"
              });
            }
            // console.log("UPDATED MESSAGE SAVED IN DATABASE", updatedMessage);
          });
        });
      });
    });
  }
};

module.exports = helpersFuncs;
