const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
  {
    username : {
      type : String,
      required : true,
      unique : true
    },
    email : {
      type : String,
      required : true,
      unique : true
    },
    phone : {
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
      type : Boolean,
      default : false
    },
    isActive : {
      type : Boolean,
      default : false
    }
  },
  {
    timestamps : true
  }
)

module.exports = mongoose.model("User", userSchema);