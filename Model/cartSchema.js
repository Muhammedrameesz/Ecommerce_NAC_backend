const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: String, 
    required: true,
  },
  title: {
    type: String, 
    required: true,
  },
  price: {
    type: Number, 
    required: true,
  },
  description: {
    type: String, 
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
  quantity: {
    type: Number, 
    default: 1,
  },
  productQuantity: {
    type: String, 
    required: true,
  },
  productId:{
    type:mongoose.Schema.Types.ObjectId,
  }
});

const CartItems = mongoose.model('CartItems', cartSchema); // Changed 'new mongoose.model' to mongoose.model

module.exports = CartItems;
