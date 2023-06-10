const User = require("../models/userModel")
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");


// Reistration
const createUser = async (req,res)=> {
  const newUser = new User(
    {
      username : req.body.username,
      email : req.body.email,
      phone : req.body.phone,
      password : cryptoJs.AES.encrypt(req.body.password,process.env.PASSWORD_SECRET_KEY).toString(),
    }
  );

  try{
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
  } catch(err){
    res.status(500).json(err);
  }
}

const loginuser = async(req,res)=>{
  try{
    const user = await User.findOne(
      {
        username : req.body.username
      }
    )
    !user && res.status(401).json("wrong credentials");

    const originalPassword = cryptoJs.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY).toString(cryptoJs.enc.Utf8);
    originalPassword != req.body.password && res.status(401).json("wrong credentials");

    const accessToken = jwt.sign(
      {
        id : user.id, 
        isAdmin : user.isAdmin
      }, 
      process.env.JWT_SECRET_KEY,
      {expiresIn:"3d"}
    );

    const { password , ...others} = user._doc;
    res.status(200).json({others, accessToken});

  } catch (err) {
    res.status(500).json(err);
  }
}



module.exports = { createUser, loginuser };