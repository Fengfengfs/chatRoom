const { body } = require('express-validator');
const validater = require('./index')
exports.registerOrLogin = validater([
  body('username').notEmpty().withMessage('用户名不能为空'),
  body('password').notEmpty().withMessage('密码不能为空')
])