const userDb = require('../models/UserModel.js');
const argon2 = require('argon2');

const registerUser = async (req, res) => {
  const { username, email, password, confPassword } = req.body;

  if (password !== confPassword)
    return res.status(400).json({ msg: 'maaf, password tidak sama' });

  try {
    //
    const findUser = await userDb.findOne({ where: { email: email } });
    if (findUser) {
      return res.status(400).json({ msg: 'maaf,email sudah digunakan' });
    }

    const hashPassword = await argon2.hash(password);
    await userDb.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    res.status(201).json({ msg: 'registrasi berhasil' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const loginUser = async (req, res) => {
  const findUser = await userDb.findOne({
    where: { email: req.body.email },
    attributes: ['uuid', 'username', 'email', 'role', 'password'],
  });
  if (!findUser) return res.status(404).json({ msg: 'user tidak ditemukan' });

  const matchPassword = await argon2.verify(
    findUser.password,
    req.body.password
  );
  if (!matchPassword)
    return res.status(400).json({ msg: 'maaf, password salah' });

  req.session.temporarySessionUUID = findUser.uuid;
  // console.log('isi session: ', req.session.temporarySessionUUID);

  res
    .status(200)
    .json({ msg: `login sukses ${req.session.temporarySessionUUID}` });
};

//tujuan ini reducer untuk mempersingkat pemanggilan setiap user pada setiap page/component
const getMe = async (req, res) => {
  if (!req.session.temporarySessionUUID) {
    return res.status(401).json({ msg: 'harap login dulu...' });
  }

  const findUser = await userDb.findOne({
    where: { uuid: req.session.temporarySessionUUID },
    attributes: [
      'id',
      'uuid',
      'username',
      'email',
      'role',
      'about',
      'address',
      'occupation',
      'phone',
      'gender',
      'profile',
      'facebook',
      'instagram',
      'twitter',
    ],
  });

  res.status(200).json(findUser);
  if (!findUser)
    return res.status(404).json({ msg: 'maaf, user tidak ditemukan' });
};

const logoutUser = (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.status(400).json({ msg: 'logout error' });
    res.status(200).json({ msg: 'logout berhasil...' });
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
};
