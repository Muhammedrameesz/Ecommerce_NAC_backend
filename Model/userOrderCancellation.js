const mongoose = require('mongoose')

const OrderCancellation = new mongoose.Schema(
    {
        user:{
            type:String,
            required:true
        },
        order_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        product_id:{
            type:String,
            required:true
        }
    }
)

const cancelledOrders = new mongoose.model('Cancelled Orders',OrderCancellation)
module.exports=cancelledOrders