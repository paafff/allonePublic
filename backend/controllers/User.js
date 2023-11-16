const argon2 = require('argon2');
const userDb = require('../models/UserModel.js');
const sharp = require('sharp');
const multer = require('multer');

const upload = multer().fields([{ name: 'photoProfile', maxCount: 1 }]);

const getAllUsers = async (req, res) => {
  try {
    const response = await userDb.find({
      attributes: [
        'id',
        'uuid',
        'username',
        'email',
        'phone',
        'address',
        'gender',
        'role',
        'profile',
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUserByUUID = async (req, res) => {
  try {
    const response = await userDb.findOne({
      where: { uuid: req.params.uuid },
      attributes: [
        'id',
        'uuid',
        'username',
        'email',
        'phone',
        'address',
        'gender',
        'role',
        'profile',
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const editUserData = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res
        .status(500)
        .json({ msg: 'Terjadi kesalahan dalam unggahan file' });
    }

    try {
      const photoProfile =
        req.files && req.files['photoProfile']
          ? await sharp(req.files['photoProfile'][0].buffer)
              .png()
              .resize({ width: 1000, height: 1000, fit: 'inside' })
              .toBuffer()
          : undefined;

      const findUser = await userDb.findOne({
        where: { uuid: req.params.uuid },
      });

      if (!findUser) {
        return res.status(404).json({ msg: 'User tidak ditemukan' });
      }

      const {
        username,
        email,
        about,
        occupation,
        address,
        phone,
        gender,
        facebook,
        instagram,
        twitter,
      } = req.body;

      const updatedData = {
        username: username || findUser.username,
        email: email || findUser.email,
        about: about || findUser.about,
        occupation: occupation || findUser.occupation,
        address: address || findUser.address,
        phone: phone || findUser.phone,
        gender: gender || findUser.gender,
        facebook: facebook || findUser.facebook,
        instagram: instagram || findUser.instagram,
        twitter: twitter || findUser.twitter,
        profile: photoProfile,
      };

      await userDb.update(updatedData, { where: { uuid: req.params.uuid } });
      res.status(200).json({ msg: 'Data berhasil diperbarui' });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

const editUserPassword = async (req, res) => {
  const findUser = await userDb.findOne({
    where: { uuid: req.params.uuid },
  });
  const { password, confPassword } = req.body;
  let hashPassword;
  if (password === '' || password === null) {
    hashPassword = findUser.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  if (password !== confPassword) {
    return res.status(400).json({ msg: 'maaf, password tidak sama...' });
  }
  try {
    await userDb.update(
      {
        password: hashPassword,
      },
      { where: { uuid: req.params.uuid } }
    );
    res.status(200).json({ msg: 'password berhasil diubah' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userDb.destroy({
      uuid: req.params.uuid,
    });
    res.status(200).json({ msg: 'user sukses dihapus' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserByUUID,
  editUserData,
  editUserPassword,
  deleteUser,
};
