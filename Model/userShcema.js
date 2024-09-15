const mongoose = require("mongoose")

const userModel = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxLength:100
    },
    lastname: {
        type: String,
        required: true,
        maxLength:100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        required: true,
    },
    hashPassword: {
        type: String,
        required: true,
        maxLength:100
    },
     image :{
        type:String
     }
   
})

const User = new mongoose.model("User", userModel);
module.exports = User;