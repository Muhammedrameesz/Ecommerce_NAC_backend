const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken')

const instructer =async (req,res)=>{
        try {
            const {email,password}=await req.body
            if(email==='admin@gmail.com' && password==='password'){
                
                const saltRound = 10
                const hashPassword =await bcrypt.hash(password, saltRound)
                console.log("password:",hashPassword);

                const tokens = generateToken(email)
                console.log('token:',tokens);
                return res.status(200).send({status:true,messege:'success',tokens:tokens})
            }else{
                return res.status(200).send({status:false,messege:'invalid email or password'})
            }
            
        } catch (error) {
            console.log(error);
        }
}

module.exports=instructer;