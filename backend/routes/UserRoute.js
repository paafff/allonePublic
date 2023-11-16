const express = require('express');
const  verifyUser  = require('./../middleware/Verify.js');
const {
  deleteUser,
  editUserData,
  editUserPassword,
  getAllUsers,
  getUserByUUID,
} = require('../controllers/User.js');

const userRouter = express.Router();

userRouter.get('/users', verifyUser, getAllUsers);
userRouter.get('/user/:uuid', verifyUser, getUserByUUID);
userRouter.patch('/user/:uuid', verifyUser, editUserData);
userRouter.patch('/user/:uuid', verifyUser, editUserPassword);
userRouter.delete('/user/:uuid', verifyUser, deleteUser);

module.exports = userRouter;
