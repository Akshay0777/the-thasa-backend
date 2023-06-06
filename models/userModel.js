const mongoose = require("mongoose")
const { boolean } = require("webidl-conversions")
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
    timeStamp : true
  }
)

module.exports = mongoose.model("User", userSchema);