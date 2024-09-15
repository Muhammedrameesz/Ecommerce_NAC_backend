const paymentRouter = require("express").Router();
const {order,getOrder, verify,getAllOrder,cashOnDelivery,getAllOrdersWithDeliveryAddress} = require("../controllers/paymentController");
const {userAddress,getUserAdderss,editUserAdderss} = require('../controllers/userAddressControler')
const userMiddleWare = require('../middlewares/userMiddleware')


paymentRouter.get("/get-payment/order",userMiddleWare, getOrder);
paymentRouter.get("/allOrders",getAllOrder);
paymentRouter.post("/order", order);
paymentRouter.post("/verify",userMiddleWare, verify);
paymentRouter.post('/add/user-address', userMiddleWare, userAddress);
paymentRouter.get('/get/user-address', userMiddleWare, getUserAdderss);
paymentRouter.post('/update-details',userMiddleWare,editUserAdderss)
paymentRouter.post('/cashOnDelivery',userMiddleWare,cashOnDelivery)
paymentRouter.get("/getAllOrdersWithDeliveryAddress",getAllOrdersWithDeliveryAddress);

module.exports = paymentRouter;
