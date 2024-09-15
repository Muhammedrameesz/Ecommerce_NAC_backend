const rateAndReviewSchema = require("../Model/rateAndReviewSchema")


const saveRateAndReview =async(req,res)=>{
    try {
        const user = req.user
        if(!user){
            return res.status(403).json({message:"User not found"})
        }
        const {review,rating,itemId}=req.body

           if(!review,!rating,!itemId){
            console.log("Incompleted data");
           return res.status(403).json({message:"Incompleted data"})
           }

           const ratingExist = await rateAndReviewSchema.findOne({userEmail:user,productId:itemId})
           if(ratingExist){
            return res.status(405).json({message:'You already added a review for this product'})
           }

           const newReview = new rateAndReviewSchema(
            {
                userEmail:user,
                productId:itemId,
                review:review,
                rating:rating
            }
           )

           if(!newReview){
            return res.status(403).json({message:"An error occured during the schema creation"})
           }

           await newReview.save()
           res.status(200).json({message:'Review Added Successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal servr error"})
    }
}



const getRateAndReviewById = async(req,res)=>{
    try {
        const {id}=req.params
        if(!id){
            console.log('incompleted data');
           return res.status(403).json({message:"incompleted data"})
        }
        const findReview = await rateAndReviewSchema.find({productId:id})
        if(!findReview){
            console.log('No reviews found');
            return res.status(404).json({message:"No reviews found"})
        }
        res.status(200).json({data:findReview})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal servr error"})
    }
}

module.exports ={saveRateAndReview,getRateAndReviewById}