const express = require('express')
const Router = express.Router()
const message_Router = require('./message')
const user_Router = require('./user')

Router.use('/message', message_Router)
Router.use('/user', user_Router)

module.exports = Router