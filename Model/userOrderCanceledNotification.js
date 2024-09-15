const mongoose = require('mongoose')

const OrderCancellationNotification = new mongoose.Schema(
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

const confirmCancel = new mongoose.model('User-OrderCancellation-Confirm',OrderCancellationNotification)
module.exports=confirmCancel