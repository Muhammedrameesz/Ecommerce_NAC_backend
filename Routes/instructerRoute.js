const instructerRouter = require('express').Router();
const insructer = require('../controllers/instructerController')
const verification = require("../middlewares/instructorTokenVerify")

instructerRouter.post('/login',insructer)
instructerRouter.post('/verification',verification)

module.exports = instructerRouter;