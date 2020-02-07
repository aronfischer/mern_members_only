const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Message", messageSchema);
