const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken')

const instructer =async (req,res)=>{
        try {
            const {email,password}=await req.body
            if(email==='admin@gmail.com' && password==='password'){
                const saltRound = 10
                const hashPassword =await bcrypt.hash(password, saltRound)
                const tokens = generateToken(email)
                return res.status(200).send({status:true,messege:'success',tokens:tokens})
            }else{
                return res.status(400).send({status:false,messege:'invalid email or password'})
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'internal server error'})
        }
}

module.exports=instructer;