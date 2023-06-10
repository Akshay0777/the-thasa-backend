const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.CONNECTION_URL)
.then(()=> console.log("Database Connected Successfully..."))
.catch((err) => console.log("connection error : ",err));

app.use("/api", require("./routes/router"));
app.use("/auth", require("./routes/authRouter"));

app.listen(process.env.PORT || 5000, ()=>{
  console.log(`Server is running on Port : ${process.env.PORT || 5000}`);
})

