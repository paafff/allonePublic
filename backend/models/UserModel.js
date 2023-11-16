const { Sequelize, DataTypes } = require('sequelize');
const dbSetting = require('../config/Database.js');

const userDb = dbSetting.define(
  'users',
  {
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 25],
      },
    },
    about: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 150],
      },
    },
    address: {
      type: DataTypes.STRING,
    },
    occupation: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 20],
      },
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    gender: {
      type: DataTypes.STRING,
    },
    profile: {
      type: DataTypes.BLOB('long'),
    },
    facebook: {
      type: DataTypes.TEXT,
    },
    instagram: {
      type: DataTypes.TEXT,
    },
    twitter: {
      type: DataTypes.TEXT,
    },
  },
  { freezeTableName: true }
);

module.exports = userDb;
