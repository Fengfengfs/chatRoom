module.exports = (err, req, res, next) => {
  if (err) {
    res.status(500).json({
      error: err.message,
      message: '服务器出错了'
    })
  }
}