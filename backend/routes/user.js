const express = require("express");
const User = require("../models/user");
const authController = require("../controllers/auth.controller");
const verifySignUp = require("../middleware/verifySignUp");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create an account
router.post("/signup", verifySignUp, authController.signup);

//Log in
router.post("/signin", authController.signin);

//Log out
router.post("/signout", authMiddleware, authController.logout);

module.exports = router;
