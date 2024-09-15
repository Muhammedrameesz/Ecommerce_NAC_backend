const userProfileEditRouter = require('express').Router()
const {userPasswordVerify,editUser}= require('../controllers/userProfileUpdate')
const userMiddleWare = require('../middlewares/userMiddleware')


userProfileEditRouter.post('/verifyPassword',userMiddleWare,userPasswordVerify)
userProfileEditRouter.post('/editUser',userMiddleWare,editUser)

module.exports = userProfileEditRouter