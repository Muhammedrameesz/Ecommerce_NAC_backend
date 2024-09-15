const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../Model/payment");
const orderSchema = require("../Model/orderSchema");
const userDetails = require("../Model/userAddressSchema");
const cartSchema = require("../Model/cartSchema");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const order = async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ message: "Amount is required" });
  }

  try {
    const options = {
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

const verify = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    grantTotal,
    cartItems,
    paymentStatus,
  } = req.body;

  try {
    const userEmai = req.user;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET || "s")
      .update(sign.toString())
      .digest("hex");

    console.log("match", razorpay_signature === expectedSign);

    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      await payment.save();

      const newOrder = new orderSchema({
        user: userEmai,
        cart: cartItems,
        total: grantTotal,
        payment: paymentStatus,
      });
      await newOrder.save();
      await cartSchema.deleteMany({ user: userEmai });
      res.json({ message: "Payement Successful  " });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

const getOrder = async (req, res) => {
  try {
    const userEmail = req.user;
    const orderDetails = await orderSchema.find({ user: userEmail });
    if (!orderDetails) {
      return res.status(404).json({ message: "No Order Found" });
    }
    res.status(200).json(orderDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const allOrders = await orderSchema.find();

    if (!allOrders || allOrders.length === 0) {
      console.log("Cannot fetch orders");
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ data: allOrders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const cashOnDelivery = async (req, res) => {
  try {
    const userEmail = req.user;
    const { grantTotal, cartItems, paymentStatus } = req.body;
    if(!grantTotal,!cartItems,!paymentStatus){
       return res.status(400).json({message:'properties missing in the body'})
    }
    const newOrder = new orderSchema({
      user: userEmail,
      cart: cartItems,
      total: grantTotal,
      payment: paymentStatus,
    })
    await newOrder.save()
    await cartSchema.deleteMany({ user: userEmail });
    res.status(200).json({message:'Cash On Delivery Successfull'})
  } catch (error) {
    console.log(error);
    re.status(500).json('internal Server Error')
  }
};


const getAllOrdersWithDeliveryAddress = async (req, res) => {
  try {
    
    const allOrders = await orderSchema.find();
    const userAddresses = await userDetails.find().exec();

    const userAddressMap = userAddresses.reduce((map, user) => {
      map[user.user] = user;
      return map;
    }, {});

    const userOrdersWithAddress = allOrders.map((order) => {
      const userAddress = userAddressMap[order.user] || {}; 
      return {
        ...order._doc,
        userAddress,
      };
    }); 
    
    res.status(200).json(userOrdersWithAddress);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  order,
  getOrder,
  verify,
  getAllOrder,
  cashOnDelivery,
  getAllOrdersWithDeliveryAddress
};
