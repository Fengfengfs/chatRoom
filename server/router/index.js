const express = require('express')
const Router = express.Router()
const room_Router = require('./room')
const user_Router = require('./user')

Router.use('/room', room_Router)
Router.use('/user', user_Router)

module.exports = Router