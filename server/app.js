const express = require('express')
const app = express()
const routes = require('./router')
const morgan = require('morgan')
const cors = require('cors')
const errorMid = require('./middleware/errorMiddle')
const PORT = process.env.PORT || 7001
app.get('/', (req, res) => {
  res.send('服务启动成功!')
})

app.use(morgan('dev'))
// 解决post请求body
app.use(express.json())
app.use(express.urlencoded())
// 解决跨域
app.use(cors())
// 路由转发
app.use(routes)
// 服务器错误中间件
app.use(errorMid)

app.listen(PORT, function () {
  console.log('服务启动成功 ========>PORT：', PORT)
})

