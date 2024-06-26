const Order = require("../models/orderModel");


// create Order
const createOrder = async (req,res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
}


// get All Orders
const getOrders = async (req,res)=>{
  try{
    const orders = await Order.find();
    res.status(200).json(orders);
  }
  catch (err) {
    res.status(500).json(err);
  }
}


// get Order By userID
const getOrderById = async (req,res) => {
  try{
    const order = await Order.find({userId : req.params.userId});
    res.status(200).json(order);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

// Update Order By Id
const updateOrder = async (req,res) => {
  try{
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
      $set : req.body
    }, {new : true});
    res.status(200).json(updatedOrder);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

// Delete Order By Id
const deleteOrder = async (req, res) => {
  try{
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order got Deleted!");
  }
  catch (err) {
    res.status(500).json(err);
  }
}

// Get Monthly Income
const getAmountMonthly = async (req,res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth()-1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth()-1));
  try {
    const income = Order.aggregate(
      [
        {$match : { createdAt : {$gte : previousMonth}}},
        {$project : {month : {month : "$createdAt"}, sales : "$amount"}},
        {$group : {_id : "$month" , total : {$sum : "$sales"}}}
      ]
    );
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(err);
  }
}


module.exports = { createOrder, getOrders, getOrderById, updateOrder, deleteOrder, getAmountMonthly };