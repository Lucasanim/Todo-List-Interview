const User = require("../models/user");
const Todo = require("../models/todo");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    // Save User to Database
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    res.send({ user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    user.token = token;
    await user.save();

    res.send({
      user,
      token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    user.token = "";
    await user.save();

    res.send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
