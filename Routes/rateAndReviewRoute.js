const reviewRouter = require('express').Router()
const {saveRateAndReview,getRateAndReviewById}=require("../controllers/rateAndReview")
const userMiddleWare = require("../middlewares/userMiddleware")

reviewRouter.post("/saveReview",userMiddleWare,saveRateAndReview)
reviewRouter.get("/getReview/:id",getRateAndReviewById)

module.exports = reviewRouter