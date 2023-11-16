const { Sequelize } = require('sequelize');

const dbSetting = new Sequelize('nama_database', 'user_database', 'password_user', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = dbSetting;
