const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const sequelize = require("./config/database");

const Todo = require("./models/todo");
const User = require("./models/user");
const Folder = require("./models/folder");

Todo.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
Todo.belongsTo(Folder, {
  constraints: true,
  onDelete: "CASCADE",
});
Folder.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
dotenv.config();

const todoRouter = require("./routes/todo");
const authRouter = require("./routes/user");
const folderRouter = require("./routes/folder");

const app = express();

app.use(express.json());
app.use(cors());

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

app.use("/api/todo", todoRouter);
app.use("/api/auth", authRouter);
app.use("/api/folder", folderRouter);

const port = process.env.PORT || 5000;
sequelize
  .sync()
  .then((result) => {
    app.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
