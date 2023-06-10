const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter")

router.use("/user", require("./userRouter"));
router.use("/product", require("./productRouter"));
router.use("/cart", require("./cartRouter"))
router.use("/order", require("./orderRouter"))


module.exports = router;