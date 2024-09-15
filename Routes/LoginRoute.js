const UserRouter = require('express').Router();
const {login,signup} = require("../controllers/userController")
const verifyToken = require("../middlewares/userTokenVerify")
const userNeassage = require("../controllers/userMessage")
const verifyGtoken = require('../google/googleTokenVerify')


UserRouter.post('/login',login);
UserRouter.post('/signup',signup);
UserRouter.post('/verify-token',verifyToken);
UserRouter.post('/message',userNeassage);
UserRouter.post('/verify-g-token',verifyGtoken);


module.exports = UserRouter;