const success = (data = null) => {
  return {
    code: 'success',
    data: data,
    msg: '成功'
  }
}

const error = (error = null) => {
  return {
    code: 'error',
    data: error,
    msg: '失败'
  }
}

module.exports = {
  success, error
}