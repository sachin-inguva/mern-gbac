const express = require("express");

const { User } = require("../model/User");

const userRouter = express.Router();

userRouter.get("/", (_, res) => {
  User.find().then((users, error) => {
    if (error) res.send({ error });
    res.send(users);
  });
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
    User.findByIdAndUpdate(id, req.body, (err, user) => {
      if (err) throw err;
      res.send({ message: "Successfully updated!", user });
    });
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
