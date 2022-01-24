const db = require('./db');
const Sequelize = require('Sequelize')
module.exports = db.defineModel('messages', {
  pid: Sequelize.STRING(50),
  msg: Sequelize.STRING(50),
  type: Sequelize.STRING(50),
});
