const express = require("express");
const { getUsers, getUserById, modifyUser, deleteUser, getUserStats } = require("../controllers/userController")
const userRouter = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyJWT")

// http://localhost:5001/user

// get all users (access - admin)
userRouter.route("/").get(verifyTokenAndAdmin, getUsers);

// get User stats (access - admin)
userRouter.route("/stats").get(verifyTokenAndAdmin,getUserStats);

// get User by Id (access - admin)
userRouter.route("/:id").get(verifyTokenAndAdmin, getUserById);

// update user by Id (access - that user)
userRouter.route("/:id").put(verifyToken, modifyUser);

// delete User by Id (access - admin)
userRouter.route("/:id").delete(verifyTokenAndAdmin, deleteUser);



module.exports = userRouter;