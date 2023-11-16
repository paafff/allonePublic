const { Sequelize, DataTypes } = require('sequelize');
const dbSetting = require('../config/Database.js');
const userDb = require('./UserModel.js');

const productDb = dbSetting.define(
  'products',
  {
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [3 - 100] },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

userDb.hasMany(productDb);
productDb.belongsTo(userDb, { foreignKey: 'userId', as: 'userDb' });

const productImgDb = dbSetting.define(
  'products_imgs',
  {
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [3 - 100] },
    },
    img1: {
      type: DataTypes.BLOB('long'),
    },
    img2: {
      type: DataTypes.BLOB('long'),
    },
    img3: {
      type: DataTypes.BLOB('long'),
    },
  },
  { freezeTableName: true }
);

module.exports = {
  productDb,
  productImgDb,
};
