const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title : {
      type : String,
      required : true,
    },
    description : {
      type : String,
      required : true
    },
    img : {
      type : String,
      required : true
    },
    category : {
      type : Array,
    },
    size : {
      type : String
    },
    color : {
      type : String
    },
    price : {
      type : Number,
      required : true
    },
    gender : {
      type : String,
      default : "all"
    },
    customize : {
      type : Boolean,
      default : false
    }
  },
  {
    timestamps : true
  }
)

module.exports = mongoose.model("Product", productSchema);