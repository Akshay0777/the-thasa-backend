const Product = require("../models/productModel")


// create Product
const createProduct = async (req,res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
}


// get All Products
const getProducts = async (req,res)=>{
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try{
    let products;
    if(qNew){
      products = await Product.find().sort({createdAt : 1}).limit(5);
    }
    else if(qCategory){
      products = await Product.find({category : {$in : [qCategory]}});
    }
    else{
      products = await Product.find({isActive : {$set : true}});
    }
    res.status(200).json(products);
  }
  catch (err) {
    res.status(500).json(err);
  }
}


// get Product By ID
const getProductById = async (req,res) => {
  try{
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

// Update Product By Id
const modifyProduct = async (req,res) => {
  try{
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      $set : req.body
    }, {new : true});
    res.status(200).json(updatedProduct);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

// Delete Product By Id
const deleteProduct = async (req, res) => {
  try{
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      $set : req.body
    }, {new : true});
    res.status(200).json("Product got Deleted!");
  }
  catch (err) {
    res.status(500).json(err);
  }
}

// Get Products Stats
const getProductsStats = async (req,res) => {
  const date = new Date();
  const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await Product.aggregate([
      {$match : {createdAt : { $gte : lastyear}}},
      {$project : {month : {$month : "$createdAt"}}},
      {$group : {_id : "$month", total : {$sum : 1}}},
    ])
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(err);
  }
}



module.exports = { getProducts, getProductById, modifyProduct, deleteProduct, getProductsStats, createProduct };