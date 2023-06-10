const express = require("express");
const authRouter = express.Router();
const { createUser, loginuser } = require("../controllers/authController");
const { get } = require("http");

// registration
authRouter.route("/register").post(createUser);

// login
authRouter.route("/login").post(loginuser);

module.exports = authRouter;