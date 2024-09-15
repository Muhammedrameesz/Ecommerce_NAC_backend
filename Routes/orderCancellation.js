const orderCancelRouter = require("express").Router();
const {
  orderCancellation,
  getOrderCancellation,
  getorderCancellationForAdmin,
  verifyOrderCancellation,
  userCancelNotify,
  deleteUserCancelNotify,
} = require("../controllers/orderCancellation");
const userMiddleWare = require("../middlewares/userMiddleware");

orderCancelRouter.post("/order", orderCancellation);
orderCancelRouter.get("/getCancellation", userMiddleWare, getOrderCancellation);
orderCancelRouter.get( "/getCancelationOrdersForAdmin",getorderCancellationForAdmin);
orderCancelRouter.post("/deletePermenently", verifyOrderCancellation);
orderCancelRouter.get("/notification", userMiddleWare, userCancelNotify);
orderCancelRouter.post("/delete/notification/:id", deleteUserCancelNotify);

module.exports = orderCancelRouter;
