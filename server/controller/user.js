const UserModal = require('../modal/user')
const md5 = require('../utils/md5')
const { success, error } = require('../utils/res')
exports.isHasUser = async (req, res) => {
  const body = req.body
  console.log(1111111111111, body)
  let { username } = body
  const user = await UserModal.findOne({ where: { username } })
  console.log(1111111111111, username)
  if (user) {
    res.send(error('用户已存在'))
  } else {
    res.send(success('该名称可以使用'))
  }
}
exports.registerOrLoginUser = async (req, res) => {
  debugger
  const body = req.body
  let { username, password } = body
  password = md5(password)
  const user = await UserModal.findOne({ where: { username } })
  if (user) {
    console.log(password)
    console.log(user.password)
    if (password == user.password) {
      res.send(success('登录成功'))
    } else {
      res.send(error('密码不正确'))
    }
  } else {
    UserModal.create({
      username, password
    }).then(result => {
      console.log('用户创建成功')
      res.send(success('创建成功'))
    })
  }

}
exports.getUserList = (req, res) => {

}