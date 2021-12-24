const { signInRouter } = require("./signInSignOut");
const { userRouter } = require("./user");
const { groupRouter } = require("./group");
const { permissionRouter } = require("./permission");

module.exports = {
  signInRouter,
  userRouter,
  groupRouter,
  permissionRouter,
};
