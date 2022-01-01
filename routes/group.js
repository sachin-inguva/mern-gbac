const express = require("express");

const { Group } = require("../model/Group");
const { User } = require("../model/User");

const groupRouter = express.Router();

groupRouter.get("/", (_, res) => {
  Group.find()
    .populate("members")
    .then((groups, error) => {
      if (error) res.send({ error });
      res.send(groups);
    });
});

groupRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existingGroup = await Group.findById(id).populate("members").exec();
    if (!existingGroup) throw new Error("Group not found");
    res.status(200).send({ group: existingGroup });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

groupRouter.post("/", async (req, res) => {
  try {
    const { name, members } = req.body;
    const existingGroup = await Group.findOne({ name }).exec();
    if (existingGroup) throw new Error("Group already exists!");
    const newGroup = new Group({ name, members });

    const group = await newGroup.save();

    const promises = members.map(async (member) => {
      const user = await User.findById(member._id).exec();
      user.group = group;
      await user.save();
    });

    await Promise.all(promises);

    return res.status(201).send(group);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

groupRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Group.findByIdAndUpdate(id, req.body, (err, group) => {
      if (err) throw err;
      res.send({ message: "Successfully updated!", group });
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

groupRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Group.findOneAndDelete({ id }, (err, group) => {
      if (err) throw err;
      res.send({ message: "Successfully deleted!", group });
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = {
  groupRouter,
};
