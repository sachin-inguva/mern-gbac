const express = require("express");
const { Group, Permission, User } = require("../model");

const permissionRouter = express.Router();

permissionRouter.get("/", (_, res) => {
  Permission.find().then((permissions, error) => {
    if (error) res.send({ error });
    res.send(permissions);
  });
});

permissionRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existingPermission = await Permission.findById(id).exec();
    if (!existingPermission) throw new Error("Permission not found");
    res.status(200).send({ permission: existingPermission });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

permissionRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Permission.findByIdAndUpdate(id, req.body, (err, permission) => {
      if (err) throw err;
      res.send({ message: "Successfully updated!", permission });
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

permissionRouter.post("/", async (req, res) => {
  try {
    const { groupId, tabs } = req.body;

    const existingGroup = await Group.findById(groupId).exec();
    if (!existingGroup) throw new Error("group does not exist!");

    const existingPermission = await Permission.findOne({
      group: existingGroup,
    }).exec();
    if (existingPermission)
      throw new Error("Permission for the group already exist!");

    const newPermission = new Permission({ group: existingGroup, tabs });
    const permission = await newPermission.save();

    const promises = existingGroup.members.map(async (member) => {
      const user = await User.findById(member._id).exec();
      user.permission = permission;
      await user.save();
    });

    await Promise.all(promises);

    res
      .status(201)
      .json({ message: "permission created successfully!", permission });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

permissionRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Permission.findOneAndDelete({ id }, (err, permission) => {
      if (err) throw err;
      res.send({ message: "Successfully deleted!", permission });
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = {
  permissionRouter,
};
