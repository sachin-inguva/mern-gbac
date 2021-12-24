const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  tabs: {
    type: Array,
    of: String,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
});

const Permission = new mongoose.model("Permission", permissionSchema);

exports.Permission = Permission;
