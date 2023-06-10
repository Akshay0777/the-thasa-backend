const express = require("express");
const productRouter = express.Router();
const { createProduct, getProducts, getProductById, modifyProduct, deleteProduct, getProductsStats } = require("../controllers/productController")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyJWT")

// http://localhost:5001/api/product

// get all Products (access - any)
productRouter.route("/").get(getProducts);

// create Product (access - admin)
productRouter.route("/").post(verifyTokenAndAdmin, createProduct);

// get Products stats (access - admin)
productRouter.route("/stats").get(verifyTokenAndAdmin,getProductsStats);

// get Product by Id (access - any)
productRouter.route("/:id").get(getProductById);

// update Product by Id (access - admin)
productRouter.route("/:id").put(verifyTokenAndAdmin, modifyProduct);

// delete Product by Id (access - admin)
productRouter.route("/:id").delete(verifyTokenAndAdmin, deleteProduct);


module.exports = productRouter;