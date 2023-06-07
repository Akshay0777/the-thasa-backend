const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
  {
    userName : {
      type : String,
      required : true,
      unique : true
    },
    password : {
      type : String,
      required : true,
      unique : true
    },
    isAdmin : {
      type : boolean,
      default : false
    }
  },
  {
    timestamps : true
  }
)

module.exports = mongoose.model("User", userSchema);