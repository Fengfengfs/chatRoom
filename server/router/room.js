const express = require('express')
const Router = express.Router()

Router.use('/', function (req, res) {
  res.send('room')
})

module.exports = Router