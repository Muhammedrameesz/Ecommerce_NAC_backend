const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const generateToken=(email)=>{
  return jwt.sign({data: email},secret,{expiresIn:'1d'})
}

module.exports = generateToken;