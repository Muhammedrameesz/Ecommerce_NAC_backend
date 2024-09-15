const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
        },
        cart: {
            type: Array,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Pending',
        },
        date: {
            type: Date,
            default: Date.now,
        },
        payment: {
            type:String,
            required: true,
        },
        
    }
)
const orderDetails = new mongoose.model('OrderDetails', orderSchema)

module.exports = orderDetails;