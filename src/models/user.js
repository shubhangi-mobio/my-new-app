const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    unique: true,
  },
  lastName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
  },
  password: {
    type: String,
  },
  newPassword: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  tokens: {
    type: String,
  },

}, {
  timestamps: true

});

module.exports = mongoose.model("User", userSchema);