const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    // unique: true,
    // minlength: 5,
    // trim: true,
  },
});

module.exports = User = mongoose.model("User", userSchema);
