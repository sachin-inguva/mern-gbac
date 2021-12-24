const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  try {
    const jwtToken = req.session?.jwt;
    if (!jwtToken) throw "Unauthorized access!";
    const payload = jwt.verify(jwtToken, process.env.JWT_TOKEN);
    req.currentUser = payload;
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized access!" });
  }
};

module.exports = {
  requireAuth,
};
