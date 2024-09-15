const mongoose = require('mongoose');
const DB = process.env.DB

const DBconnection =()=>{
    mongoose.connect(DB)
    console.log('DB connected succefully')
}

module.exports = DBconnection;
