const router = require('express').Router();
const UserRouter = require('./LoginRoute');
const productRouter = require('./ProductRoute');
const instructerRouter = require("./instructerRoute")
const paymentRouter = require('./paymentRoute')
const profileRouter = require('./profiePictureRoute')
const userProfileEditRouter = require("./userProfileUpdate")
const userListRouter = require('./userListRoutes')
const orderCancelRouter = require('./orderCancellation')
const reviewRouter = require("./rateAndReviewRoute")

router.use('/user',UserRouter)
router.use('/product',productRouter)
router.use('/instructer',instructerRouter)
router.use('/payment',paymentRouter)
router.use('/profile',profileRouter)
router.use('/user/update',userProfileEditRouter)
router.use('/userList',userListRouter)
router.use('/cancel',orderCancelRouter)
router.use('/rateAndReview',reviewRouter)


module.exports = router; 