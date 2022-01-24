const mysql = require('mysql')
const connect = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123456aa',
  database: 'chatroom'
})

const sqlFn = (sql, arr, callback) => {
  connect.query(sql, arr, (err, result) => {
    if (err) {
      console.log(new Error(err))
    } else {
      callback(result)
    }
  })
}

module.exports = sqlFn