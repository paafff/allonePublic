const { articleDb } = require('../models/ArticleModel.js');
const sharp = require('sharp');
const multer = require('multer');
const userDb = require('../models/UserModel.js');
const { v4: uuidv4 } = require('uuid');

// const upload = multer().single('cover');
const upload = multer().fields([{ name: 'cover', maxCount: 1 }]);

const createArticle = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res
        .status(500)
        .json({ msg: 'maaf,terjadi kesalahan dalam unggahan file' });
    }

    const { title, content, summary } = req.body;

    try {
      // ini revisi dibikin 1 image saja
      const cover =
        req.files && req.files['cover']
          ? await sharp(req.files['cover'][0].buffer)
              .png()
              .resize({ width: 1920, height: 1080, fit: 'inside' })
              .toBuffer()
          : undefined;

      await articleDb.create({
        uuid: uuidv4(),
        userId: req.userId,
        title: title,
        cover: cover,
        content: content,
        summary: summary,
      });

      res.status(200).json({ msg: 'artikel sukses dibuat bang' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

const updateArticle = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res
        .status(500)
        .json({ msg: 'maaf terjadi kesalahan pada unggahan file' });
    }

    try {
      const filterArticle = {
        uuid: req.params.uuid,
        userId: req.userId,
      };

      const { title, content, summary } = req.body;

      //penanganan image(misal ada yang kosong)
      let cover;
      if (req.files) {
        cover = req.files['cover']
          ? await sharp(req.files['cover'][0].buffer)
              .png()
              .resize({ width: 1000, height: 1000, fit: 'inside' })
              .toBuffer()
          : undefined;
      }
      // const { cover, imgFilesTwo, imgFilesThree } = req.file || {};

      await articleDb.update(
        {
          title: title || undefined,
          content: content || undefined,
          summary: summary || undefined,
          cover: cover || undefined,
        },
        { where: filterArticle }
      );

      res.status(200).json({ msg: 'artikel sukses diperbarui' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

const getArticleByTitle = async (req, res) => {
  try {
    const findArticle = await articleDb.findOne({
      where: { title: req.params.paramsTitle },
      attributes: ['title', 'content', 'summary', 'cover'],
      include: [
        {
          model: userDb,
          as: 'userDb',
          attributes: [
            'username',
            'email',
            'facebook',
            'instagram',
            'twitter',
            'profile',
            'about',
            'occupation',
          ],
        },
      ],
    });

    if (!findArticle)
      return res.status(404).json({ msg: 'article tidak ditemukan' });

    res.status(200).json(findArticle);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getArticles = async (req, res) => {
  try {
    const findArticle = await articleDb.findAll({
      attributes: ['summary', 'title', 'content', 'cover'],

      include: [
        {
          model: userDb,
          as: 'userDb',

          attributes: ['email', 'profile', 'username'],
        },
      ],

      limit: 6, // Batasi jumlah baris yang diambil
      order: [['createdAt', 'DESC']], // Urutkan berdasarkan tanggal pembuatan (createdAt) secara menurun
    });

    res.status(200).json(findArticle);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getArticlesByUUID = async (req, res) => {
  try {
    let response;

    if (req.role === 'admin') {
      response = await articleDb.findAll({
        attributes: ['summary', 'title', 'content', 'cover', 'uuid'],
        include: [
          {
            model: userDb,
            as: 'userDb',
            attributes: ['username', 'email'],
          },
        ],
      });
    } else {
      response = await articleDb.findAll({
        where: { userId: req.userId },
        attributes: ['summary', 'title', 'content', 'cover', 'uuid'],
        include: [
          {
            model: userDb,
            as: 'userDb',
            attributes: ['username', 'email'],
          },
        ],
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createArticle,
  updateArticle,
  getArticleByTitle,
  getArticles,
  getArticlesByUUID,
};
