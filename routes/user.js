const express = require("express");
const jwt = require("jsonwebtoken");

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
    const user = await User.findByIdAndUpdate(id, req.body).exec();
    res.send({ message: "Successfully updated!", user });
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
