const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: { type: String, required: true },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    permission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
    },
  },
  {
    toJSON: {
      transform(doc, user) {
        delete user.password;
      },
    },
  }
);

const User = new mongoose.model("User", userSchema);

exports.User = User;
