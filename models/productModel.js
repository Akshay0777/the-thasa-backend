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
      type : Array
    },
    color : {
      type : Array
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
    },
    functionSpecial : {
      type: Boolean,
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

module.exports = mongoose.model("Product", productSchema);