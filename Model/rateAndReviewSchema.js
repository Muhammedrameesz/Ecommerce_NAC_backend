const mongoose = require("mongoose");

const rateAndReviewSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      // trim: true,
      // lowercase: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true } 
);

const RateAndReview = mongoose.model("RateAndReview", rateAndReviewSchema);
module.exports = RateAndReview;
