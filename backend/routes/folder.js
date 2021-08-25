const express = require("express");
const Folder = require("../models/folder");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET   /api/folder/
// Get all folders of the user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const folders = await Folder.findAll({
      where: {
        userId: req.user.id,
      },
    });
    if (folders) {
      return res.send(folders);
    }
    res.status(404).send({ message: "Not Found." });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// POST   /api/folder/
// Create a new folder
router.post("/", authMiddleware, async (req, res) => {
  try {
    const folder = await Folder.create({
      ...req.body,
      userId: req.user.id,
    });
    const folders = await Folder.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.send(folders);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GET   /api/folder/id
// Get specific folder
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const folder = await Folder.findOne({
      where: {
        userId: req.user.id,
        id: req.params.id,
      },
    });

    if (folder) {
      return res.send(folder);
    }
    res.status(404).send({ message: "Not Found." });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// DELETE   /api/folder/id
// Delete specific folder
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const folder = await Folder.destroy({
      where: {
        userId: req.user.id,
        id: req.params.id,
      },
    });

    const folders = await Folder.findAll({
      where: {
        userId: req.user.id,
      },
    });
    if (folders) {
      return res.send(folders);
    }
    res.status(404).send({ message: "Not Found." });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
