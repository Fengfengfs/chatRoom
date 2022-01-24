const express = require('express')
const Router = express.Router()
const messaageModal = require('../modal/messaage')
const messageCtl = require('../controller/message')
// 获取用户列表消息记录
Router.get('/', messageCtl.getMessageList)
// 创建消息
Router.post('/sendMsg', messageCtl.sendMessageList)

module.exports = Router