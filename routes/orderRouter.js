const express = require("express");
const { getOrders } = require("../controllers/orderController");
const orderRouter = express.Router();

// http://localhost:5001/api/order

// get all Order (access - admin)
orderRouter.route("/").get(verifyTokenAndAdmin , getOrders);

// create Order (access - user)
orderRouter.route("/").post(verifyTokenAndAuthorization, createOrder);

// Monthly Order Income (access - admin)
orderRouter.route("/amount").get(verifyTokenAndAdmin, getAmountMonthly);

// get Order by UserId (access - User)
orderRouter.route("/:userId").get(verifyTokenAndAuthorization , getOrderById);

// Update Order (access - User)
orderRouter.route("/:id").put(verifyTokenAndAdmin,updateOrder);

// delete Order by Id (access - admin)
orderRouter.route("/:id").delete(verifyTokenAndAdmin, deleteOrder);



module.exports = orderRouter;