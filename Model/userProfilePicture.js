const mongoose = require('mongoose')

const userProfilePicture = new mongoose.Schema(
    {
        image:{
            type:String,
            required:true
        },
        userEmail:{
            type:String,
            required:true
        }
    }
)
const profilePicture = new mongoose.model('userProfilePIcture',userProfilePicture)
module.exports = profilePicture