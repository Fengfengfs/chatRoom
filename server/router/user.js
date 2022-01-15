const express = require('express')
const Router = express.Router()

Router.use('/', function (req, res) {
  res.send('user')
})

module.exports = Router