const express = require("express");
const Todo = require("../models/todo");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET   /api/todo/folderId
// Get all todos
router.get("/:folderId", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        userId: req.user.id,
        folderId: req.params.folderId,
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

// POST   /api/todo/folderId
// Create a new todo
router.post("/:folderId", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.create({
      ...req.body,
      userId: req.user.id,
      folderId: req.params.folderId,
    });
    const todos = await Todo.findAll({
      where: {
        userId: req.user.id,
        folderId: req.params.folderId,
      },
    });
    res.send(todos);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GET   /api/todo/id
// Get specific todo
router.get("/current/:id", authMiddleware, async (req, res) => {
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

// PATCH   /api/todo/updateTutle/id/folderId
// Update specific todo title
router.patch("/updateTitle/:id/:folderId", authMiddleware, async (req, res) => {
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

    if (req.body.title) {
      await todo.update({
        title: req.body.title,
      });
    }

    const todos = await Todo.findAll({
      where: {
        userId: req.user.id,
        folderId: req.params.folderId,
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

// PATCH   /api/todo/updateComplete/id/folderId
// Update specific todo completion
router.patch(
  "/updateComplete/:id/:folderId",
  authMiddleware,
  async (req, res) => {
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

      await todo.update({
        completed: req.body.completed,
      });

      const todos = await Todo.findAll({
        where: {
          userId: req.user.id,
          folderId: req.params.folderId,
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
  }
);

// DELETE   /api/todo/id/folderId
// delete specific todo
router.delete("/:id/:folderId", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.destroy({
      where: {
        userId: req.user.id,
        id: req.params.id,
      },
    });
    const todos = await Todo.findAll({
      where: {
        userId: req.user.id,
        folderId: req.params.folderId,
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

module.exports = router;
