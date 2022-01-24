const crypto = require('crypto')

module.exports = (str) => {
  const ret = crypto.createHash('md5').update(str).digest('hex')
  return ret
}