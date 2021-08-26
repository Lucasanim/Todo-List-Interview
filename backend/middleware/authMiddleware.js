const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ id: decoded.id, token: token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
  // let token = req.headers["x-access-token"];
  // console.log(req.headers);

  // if (!token) {
  //   return res.status(403).send({
  //     message: "No token provided!",
  //   });
  // }

  // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //   if (err) {
  //     return res.status(401).send({
  //       message: "Unauthorized!",
  //     });
  //   }
  //   req.userId = decoded.id;
  //   req.user = decoded;
  //   req.token = token;
  //   next();
  // });
};

module.exports = authMiddleware;
