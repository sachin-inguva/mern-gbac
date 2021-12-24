const bcrypt = require("bcryptjs");

const hashPassword = async (pass) => await bcrypt.hash(pass, 10);

const validatePassword = async (strPassword, hashedPassword) => {
  return await bcrypt.compare(strPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  validatePassword,
};
