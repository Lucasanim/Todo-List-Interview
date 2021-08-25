const Todo = require("../models/todo");
const User = require("../models/user");

const checkDuplicateEmail = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    return res.status(400).send({
      message: "Failed! Email is already in use!",
    });
  }

  next();
};

module.exports = checkDuplicateEmail;
