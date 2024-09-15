const profileRouter = require('express').Router()
const upload = require('../middlewares/upload')
const userMiddleWare = require('../middlewares/userMiddleware')
const {AddProfilePicture,EditProfilePicture,getUserDetails,getUserProfilePicture} = require('../controllers/userProfilePictureControllers')

profileRouter.post('/addPicture',userMiddleWare,upload.single('image'),AddProfilePicture)
profileRouter.get('/getUser',userMiddleWare,getUserDetails)
profileRouter.get('/getProfilePicture',userMiddleWare,getUserProfilePicture)
profileRouter.post('/editPicture',userMiddleWare,upload.single('image'), EditProfilePicture)


module.exports = profileRouter