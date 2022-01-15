const success = (data) => {
  return {
    code: 'success',
    data: data,
    msg: '成功'
  }
}

const error = (error) => {
  return {
    code: 'error',
    msg: error
  }
}

module.exports = {
  success, error
}