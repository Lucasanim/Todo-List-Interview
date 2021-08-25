const express = require("express");
const Todo = require("../models/todo");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET   /api/todo/
// Get all todos
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        userId: req.user.id,
      },
    });
    if (todos) {
      return res.send(todos);
    }
    res.status(404).send({ message: "Not Found." });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// POST   /api/todo/
// Create a new todo
router.post("/", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.create({
      ...req.body,
      userId: req.user.id,
    });
    res.send(todo);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GET   /api/todo/id
// Get specific todo
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: {
        userId: req.user.id,
        id: req.params.id,
      },
    });

    if (todo) {
      return res.send(todo);
    }
    res.status(404).send({ message: "Not Found." });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// PATCH   /api/todo/id
// Update specific todo
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: {
        userId: req.user.id,
        id: req.params.id,
      },
    });

    if (!todo) {
      return res.status(404).send({ message: "Not Found." });
    }

    if (req.body.completed) {
      todo.completed = req.body.completed;
    }

    if (req.body.title) {
      todo.title = req.body.title;
    }
    await todo.save();
    res.send(todo);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
