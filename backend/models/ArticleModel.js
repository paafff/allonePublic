const { Sequelize, DataTypes } = require('sequelize');
const dbSetting = require('../config/Database.js');
const userDb = require('./UserModel.js');

const articleDb = dbSetting.define(
  'articles',
  {
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cover: {
      type: DataTypes.BLOB('long'),
    },
  },
  { freezeTableName: true }
);

userDb.hasMany(articleDb);
articleDb.belongsTo(userDb, { foreignKey: 'userId', as: 'userDb' });

module.exports = {
  articleDb,
};
