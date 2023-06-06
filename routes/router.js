const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter")

router.use("/user", require("./userRouter"));


module.exports = router;