const users = require('../Model/userShcema')


const getAllUsers = async(req,res)=>{
    try {
        const userList = await users.find()
        if(!userList){
            console.log('no users found');
            return res.status(404).json({message:'No User Found'})
        }
        res.status(200).json(userList)
        
    } catch (error) {
        console.log('error found',error);
        res.status(500).json(error)
    }
}

module.exports = getAllUsers