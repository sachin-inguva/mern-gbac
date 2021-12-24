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
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    groups: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    permissions: {
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
