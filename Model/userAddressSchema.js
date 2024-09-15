const mongoose = require('mongoose');

const userAdderssSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        contactnumber: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    }
)

const userAddress = new mongoose.model('userAddress', userAdderssSchema)

module.exports = userAddress;