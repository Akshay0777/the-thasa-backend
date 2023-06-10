const express = require("express");
const { createCart, getCarts, getCartById, updateCart, deleteCart } = require("../controllers/cartController");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./verifyJWT");
const cartRouter = express.Router();

// http://localhost:5001/api/cart

// get all Cart (access - admin)
cartRouter.route("/").get(verifyTokenAndAdmin , getCarts);

// create Cart (access - user)
cartRouter.route("/").post(verifyTokenAndAuthorization, createCart);

// Update Cart (access - User)
cartRouter.route("/:id").put(verifyTokenAndAuthorization,updateCart);

// get Cart by UserId (access - User)
cartRouter.route("/:userId").get(verifyTokenAndAuthorization , getCartById);

// delete Cart by Id (access - admin)
cartRouter.route("/:id").delete(verifyTokenAndAdmin, deleteCart);




module.exports = cartRouter;