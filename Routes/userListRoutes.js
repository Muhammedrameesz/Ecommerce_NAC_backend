const userListRouter = require('express').Router()
const Allusers = require("../controllers/getAllUsers")


userListRouter.get('/allUsers',Allusers)

module.exports = userListRouter