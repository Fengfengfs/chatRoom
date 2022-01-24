const express = require('express')
const Router = express.Router()
const sqlFn = require('../utils/mysql')
const userModal = require('../modal/user')
const userCtl = require('../controller/user')
const { registerOrLogin } = require('../validator/user')
Router.post('/registerOrLoginUser', userCtl.registerOrLoginUser)
Router.get('/getUserList', userCtl.getUserList)
Router.post('/isHasUser', userCtl.isHasUser)

module.exports = Router