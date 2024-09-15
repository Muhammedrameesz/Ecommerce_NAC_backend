const orderCancelSchema = require("../Model/userOrderCancellation");
const orderSchema = require("../Model/orderSchema");
const confirmCancelUserNotifySchema = require("../Model/userOrderCanceledNotification");

const orderCancellation = async (req, res) => {
  try {
    const { order, product, user } = req.body;

    if ((!order, !product, !user)) {
      console.log("incompleted data");
      res.status(404).json({ message: "incompleted data" });
    }

    const newCancelRequest = new orderCancelSchema({
      user: user,
      order_id: order,
      product_id: product,
    });
    await newCancelRequest.save();
    res.status(200).json({ message: "cancel requested" });
  } catch (error) {
    console.log(error);
    re.status(500).json("Internal server error");
  }
};

const getOrderCancellation = async (req, res) => {
  try {
    const userEmail = req.user;
    const requestdeOrderCacellation = await orderCancelSchema.find({
      user: userEmail,
    });
    if (!requestdeOrderCacellation) {
      res.status(404).json({ message: "no cancel request found" });
    }
    res
      .status(200)
      .json({ data: requestdeOrderCacellation, message: "cancel requested" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getorderCancellationForAdmin = async (req, res) => {
  try {
    const cancelRequest = await orderCancelSchema.find();

    if (cancelRequest.length === 0) {
      return res
        .status(404)
        .json({ message: "Cancellation request not found" });
    }

    let orderIds = [];
    let productIds = [];

    cancelRequest.forEach((item) => {
      orderIds.push(item.order_id);
      productIds.push(item.product_id);
    });

    const orders = await orderSchema.find({ _id: { $in: orderIds } });

    const withProductDetails = orders.map((order) => {
      const matchedProducts = order.cart.filter((item) =>
        productIds.includes(item._id)
      );
      return {
        ...order._doc,
        cart: matchedProducts,
      };
    });
    res
      .status(200)
      .json({
        cancelRequest: cancelRequest,
        productDetails: withProductDetails,
      });
  } catch (error) {
    console.error("Error fetching cancellation requests:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const verifyOrderCancellation = async (req, res) => {
  try {
    const { order, product, user } = req.body;
    const orderDoc = await orderSchema.findById(order);
    if (!orderDoc) {
      return res.status(404).json({ message: "Order not found" });
    }
    const productIndex = orderDoc.cart.findIndex(
      (item) => item._id.toString() === product
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in order" });
    }
    orderDoc.cart.splice(productIndex, 1);
    if (orderDoc.cart.length === 0) {
      await orderSchema.findByIdAndDelete(order);
      console.log("Order deleted as cart is empty");
    } else {
      //  calculate the new total and save the order
      const newTotal = orderDoc.cart.reduce((acc, item) => acc + item.price, 0);
      orderDoc.total = newTotal;
      await orderDoc.save();
    }
    const confirmCancel = new confirmCancelUserNotifySchema({
      user: user,
      order_id: order,
      product_id: product,
    });
    await confirmCancel.save();

    const deleteOrderCancelSchema = await orderCancelSchema.deleteOne({
      user: user,
      order_id: order,
      product_id: product,
    });
    if (!deleteOrderCancelSchema) {
      console.error("Order cancellation schema not deleted");
      return res
        .status(405)
        .json({ message: "Order cancellation schema not deleted" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error verifying order cancellation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const userCancelNotify = async(req,res)=>{
  try {
      const userEmail=req.user
      const notify= await confirmCancelUserNotifySchema.find({user:userEmail})
      if(!notify){
        console.log('notificatopn not saved');
        return res.status(404).json({message:'notification not saved'})
      }
      res.status(200).json(notify)
  } catch (error) {
    console.log(error);
    res.status(505).json('Internal Server Error')
  }
}
const deleteUserCancelNotify = async(req,res)=>{
  try {
     const {id}=req.params
     const deleted = await confirmCancelUserNotifySchema.findByIdAndDelete(id)
     if(!deleted){
      console.log('Notificatiion no deleted');
      res.status(402).json({message:'Notificatiion no deleted'})
     }
     res.status(200).json('Deleted Successfully')
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server Error')
  }
}


module.exports = {
  orderCancellation,
  verifyOrderCancellation,
  getOrderCancellation,
  getorderCancellationForAdmin,
  userCancelNotify,
  deleteUserCancelNotify
};
