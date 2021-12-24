const express = require("express");

const { Permission } = require("../model/Permission");

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
