const jwt = require('jsonwebtoken')
const config = require('../config')
const { promisify } = require('util')

exports.setJwt = promisify(jwt.sign)
exports.parseJwt = promisify(jwt.verify)
exports.decode = promisify(jwt.decode)