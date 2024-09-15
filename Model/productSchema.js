const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    // enum: ["Water", "Soda", "CoolDrinks", "Lays", "Sweets&Candy"],// Allowed values

  },
  image: {
    type: String,
    required: true,
  },
  productQuantity:{
    type:String,
    required:true
  }
});

const Products = new mongoose.model("Product", productSchema);

module.exports = Products;
