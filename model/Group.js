const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  members: {
    type: Array,
    of: String,
    required: true,
  },
});

const Group = new mongoose.model("Group", groupSchema);

exports.Group = Group;
