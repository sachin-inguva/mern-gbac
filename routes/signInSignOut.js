const express = require("express");
const jwt = require("jsonwebtoken");

const { User } = require("../model/User");
const { validatePassword, hashPassword } = require("../utils");

const signInRouter = express.Router();

signInRouter.post("/signIn", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username }).exec();
    if (!existingUser) {
      throw new Error("User does not exist!");
    }
    const isPasswordValid = await validatePassword(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid username or password!");
    }
    const jwtToken = jwt.sign(
      {
        id: existingUser.id,
        username: existingUser.username,
      },
      process.env.JWT_TOKEN
    );
    req.session = {
      jwt: jwtToken,
    };
    res.status(200).send({ message: "Sign in Successful", user: existingUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

signInRouter.post("/signOut", (req, res) => {
  req.session = null;
  res.send({ message: "Signed out successfully!" });
});

signInRouter.post("/createUser", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username }).exec();

    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ username, password: hashedPassword });

    const user = await newUser.save();

    return res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = {
  signInRouter,
};
