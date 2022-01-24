const db = require('./db');
const Sequelize = require('Sequelize')
module.exports = db.defineModel('users', {
  username: Sequelize.STRING(50),
  password: Sequelize.STRING(50),
});
