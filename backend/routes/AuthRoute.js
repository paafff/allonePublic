const express =require ('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} =require ('../controllers/Auth.js');

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/getme', getMe);
authRouter.delete('/logout', logoutUser);

module.exports = authRouter;
