const Sequelize = require('sequelize');
const moment = require('moment')
console.log('init sequelize...');
const config = process.env.CONFIG || {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123456aa',
  database: 'chatroom'
}
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})

const ID_TYPE = Sequelize.STRING(50);
function generateId() {
  return 'u-' + Date.now().toString()
}
function defineModel(name, attributes) {
  var attrs = {};
  for (let key in attributes) {
    let value = attributes[key];
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      };
    }
  }
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true
  };
  attrs.createtime = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.updatedtime = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: function (obj) {
        let now = moment().format('YYYY-MM-DD')
        if (obj.isNewRecord) {
          if (!obj.id) {
            obj.id = generateId();
          }
          obj.createtime = now;
          obj.updatedtime = now;
          obj.version = 0;
        } else {
          obj.updatedtime = moment().format('YYYY-MM-DD')
          obj.version++;
        }
        console.log(obj)
      }
    }
  });
}
module.exports = { defineModel }