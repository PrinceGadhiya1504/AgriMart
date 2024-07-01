const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    mobile: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['farmer', 'merchant'],
        require: true
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('users', UserSchema);
module.exports = User;