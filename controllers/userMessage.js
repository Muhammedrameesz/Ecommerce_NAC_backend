const nodemailer = require("nodemailer");

const userMessage = async(req,res)=>{
    try {
        const data = await req.body;
        console.log('User message',data);
        res.status(200).json({message:'User message successfully sent'})
        
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: 'Error Ocuurted' })
    }
}

module.exports = userMessage;

