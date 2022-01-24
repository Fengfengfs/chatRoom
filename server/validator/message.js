const { body } = require('express-validator');
const validater = require('../middleware/validate')
const messageModal = require('../modal/messaage')
// exports.registerOrLogin = validater([
//   body('username').notEmpty().withMessage('用户名不能为空').custom(async name => {
//     const user = await userModal.findAll({ where: { name: name } })
//     if (user.length > 0) {
//       return Promise.reject('用户名已经存在')
//     }
//   }),
//   body('password').notEmpty().withMessage('密码不能为空')
// ])