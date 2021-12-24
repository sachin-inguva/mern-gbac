const express = require("express");

const { Group } = require("../model/Group");

const groupRouter = express.Router();

groupRouter.get("/", (_, res) => {
  Group.find().then((groups, error) => {
    if (error) res.send({ error });
    res.send(groups);
  });
});

groupRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existingGroup = await Group.findById(id).exec();
    if (!existingGroup) throw new Error("Group not found");
    res.status(200).send({ group: existingGroup });
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
