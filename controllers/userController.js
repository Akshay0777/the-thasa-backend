const User = require("../models/userModel")
const cryptoJs = require("crypto-js");

// get All Users
const getUsers = async (req,res)=>{
  const query = req.query.new;
  try{
    const users = query ? await User.find().sort({_id : -1}).limit(5) : await User.find();
    res.status(200).json(users);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

// get User By ID
const getUserById = async (req,res) => {
  try{
    const user = await User.findById(req.params.id);
    const {password, ...others} = user._doc
    res.status(200).json(others);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

// Update User By Id
const modifyUser = async (req,res) => {
  if(req.body.password){
    req.body.password = cryptoJs.AES.encrypt(req.body.password,process.env.PASSWORD_SECRET_KEY).toString();
  }

  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set : req.body
    }, {new : true});
    res.status(200).json(updatedUser);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

// Delete User By Id
const deleteUser = async (req, res) => {
  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set : req.body
    }, {new : true});
    res.status(200).json("User got Deleted!");
  }
  catch (err) {
    res.status(500).json(err);
  }
}

// Get User Stats
const getUserStats = async (req,res) => {
  const date = new Date();
  const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      {$match : {createdAt : { $gte : lastyear}}},
      {$project : {month : {$month : "$createdAt"}}},
      {$group : {_id : "$month", total : {$sum : 1}}},
    ])
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(err);
  }
}


module.exports = { getUsers, getUserById, modifyUser, deleteUser, getUserStats };