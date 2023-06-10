const Cart = require("../models/cartModel");


// create Cart
const createCart = async (req,res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
}


// get All Carts
const getCarts = async (req,res)=>{
  try{
    const carts = await Cart.find({isActive : {$set : true}});
    res.status(200).json(carts);
  }
  catch (err) {
    res.status(500).json(err);
  }
}


// get Cart By userID
const getCartById = async (req,res) => {
  try{
    const cart = await Cart.findOne({userId : req.params.userId});
    res.status(200).json(cart);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

// Update Cart By Id
const updateCart = async (req,res) => {
  try{
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
      $set : req.body
    }, {new : true});
    res.status(200).json(updatedCart);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

// Delete Cart By Id
const deleteCart = async (req, res) => {
  try{
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart got Deleted!");
  }
  catch (err) {
    res.status(500).json(err);
  }
}


module.exports = { createCart, getCarts, getCartById, updateCart, deleteCart };