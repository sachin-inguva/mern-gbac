const express = require("express");
const jwt = require("jsonwebtoken");

const { hashPassword } = require("../utils");
const { User } = require("../model/User");

const userRouter = express.Router();

userRouter.get("/", async (_, res) => {
  try {
    const users = await User.find().populate("permission").exec();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

userRouter.post("/createUser", async (req, res) => {
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

userRouter.get("/currentUser", async (req, res) => {
  try {
    const jwtToken = req.session?.jwt;
    const payload = jwt.verify(jwtToken, process.env.JWT_TOKEN);
    const existingUser = await User.findById(payload._id)
      .populate("permission")
      .exec();
    if (!existingUser) throw new Error("User not found");
    res.status(200).send({ user: existingUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await User.findById(id).exec();
    if (!existingUser) throw new Error("User not found");
    res.status(200).send({ user: existingUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

userRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await User.findByIdAndUpdate(id, {
      username,
      password: hashedPassword,
    }).exec();
    res.status(200).send({ message: "Successfully updated!", user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    User.findOneAndDelete({ id }, (err, user) => {
      if (err) throw err;
      res.send({ message: "Successfully deleted!", user });
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = {
  userRouter,
};
