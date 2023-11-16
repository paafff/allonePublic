const { productDb, productImgDb } = require('../models/ProductModel.js');
const userDb = require('../models/UserModel.js');
const sharp = require('sharp');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const upload = multer().fields([
  { name: 'imgFilesOne', maxCount: 1 },
  { name: 'imgFilesTwo', maxCount: 1 },
  { name: 'imgFilesThree', maxCount: 1 },
]);

const createProduct = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      // Tangani kesalahan unggahan
      return res
        .status(500)
        .json({ msg: 'Terjadi kesalahan dalam unggahan file' });
    }

    const { name, price, description } = req.body;
    const productUUIDV4 = uuidv4();

    try {
      //penanganan image(misal ada yang kosong)
      const imgFilesOne =
        req.files && req.files['imgFilesOne']
          ? await sharp(req.files['imgFilesOne'][0].buffer)
              .png()
              .resize({ width: 1000, height: 1000, fit: 'inside' })
              .toBuffer()
          : undefined;
      const imgFilesTwo =
        req.files && req.files['imgFilesTwo']
          ? await sharp(req.files['imgFilesTwo'][0].buffer)
              .png()
              .resize({ width: 1000, height: 1000, fit: 'inside' })
              .toBuffer()
          : undefined;
      const imgFilesThree =
        req.files && req.files['imgFilesThree']
          ? await sharp(req.files['imgFilesThree'][0].buffer)
              .png()
              .resize({ width: 1000, height: 1000, fit: 'inside' })
              .toBuffer()
          : undefined;

      await productImgDb.create({
        uuid: productUUIDV4,
        userId: req.userId,
        name: name,
        img1: imgFilesOne,
        img2: imgFilesTwo,
        img3: imgFilesThree,
      });

      await productDb.create({
        uuid: productUUIDV4,
        userId: req.userId,
        name: name,
        price: price,
        description: description,
      });
      res.status(200).json({ msg: 'produk sukses ditambahkan' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

const updateProduct = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res
        .status(500)
        .json({ msg: 'maaf terjadi kesalahan pada unggahan file' });
    }

    try {
      const filterProduct = { uuid: req.params.uuid, userId: req.userId };

      const { name, price, description } = req.body;
      //penanganan image(misal ada yang kosong)
      const imgFilesOne = req.files['imgFilesOne']
        ? await sharp(req.files['imgFilesOne'][0].buffer)
            .png()
            .resize({ width: 1000, height: 1000, fit: 'inside' })
            .toBuffer()
        : undefined;
      const imgFilesTwo = req.files['imgFilesTwo']
        ? await sharp(req.files['imgFilesTwo'][0].buffer)
            .png()
            .resize({ width: 1000, height: 1000, fit: 'inside' })
            .toBuffer()
        : undefined;
      const imgFilesThree = req.files['imgFilesThree']
        ? await sharp(req.files['imgFilesThree'][0].buffer)
            .png()
            .resize({ width: 1000, height: 1000, fit: 'inside' })
            .toBuffer()
        : undefined;

      await productDb.update(
        {
          name: name || undefined,
          price: price || undefined,
          description: description || undefined,
        },
        { where: filterProduct }
      );
      await productImgDb.update(
        {
          name: name,
          img1: imgFilesOne,
          img2: imgFilesTwo,
          img3: imgFilesThree,
        },
        { where: filterProduct }
      );

      res.status(200).json({ msg: 'produk sukses diperbarui' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

const getProductsByUUID = async (req, res) => {
  try {
    let response;
    if (req.role === 'admin') {
      response = await productDb.findAll({
        attributes: ['uuid', 'name', 'price', 'description'],
        include: [
          {
            model: userDb,
            as: 'userDb',
            attributes: ['username', 'email', 'address'],
          },
        ],
      });
    } else {
      //jika role user
      response = await productDb.findAll({
        where: { userId: req.userId },
        attributes: ['uuid', 'name', 'price', 'description'],
        include: [
          {
            model: userDb,
            as: 'userDb',
            attributes: ['username', 'email', 'address'],
          },
        ],
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const findProductImg = await productImgDb.findAll({
      attributes: ['img1', 'img2', 'img3'],
      limit: 8, // Batasi jumlah baris yang diambil
      order: [['createdAt', 'DESC']], // Urutkan berdasarkan tanggal pembuatan (createdAt) secara menurun
    });

    const findProduct = await productDb.findAll({
      attributes: ['name', 'price', 'uuid', 'description', 'createdAt'],
      include: [
        {
          model: userDb,
          as: 'userDb',
          attributes: ['username', 'email', 'address', 'gender', 'phone'],
        },
      ],
      limit: 8, // Batasi jumlah baris yang diambil
      order: [['createdAt', 'DESC']], // Urutkan berdasarkan tanggal pembuatan (createdAt) secara menurun
    });

    const productData = findProduct.map((findProductFunc, index) => {
      return {
        ...findProductFunc.toJSON(),
        ...findProductImg[index].toJSON(),
      };
    });

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getProductByUUID = async (req, res) => {
  try {
    const findProduct = await productDb.findOne({
      where: { uuid: req.params.uuid },
      attributes: ['name', 'price', 'description', 'uuid'],
      include: [
        {
          model: userDb,
          as: 'userDb',
          attributes: ['username', 'email', 'address', 'phone', 'gender'],
        },
      ],
    });

    const findProductImg = await productImgDb.findOne({
      where: { uuid: req.params.uuid },
      attributes: ['img1', 'img2', 'img3'],
    });

    const productData = {
      ...findProduct.toJSON(),
      ...findProductImg.toJSON(),
    };

    if (!findProduct)
      return res
        .status(404)
        .json({ msg: 'product tidak ditemukan (getglobalproductbyuuid)' });

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const findProduct = await productDb.findOne({
      where: { uuid: req.params.uuid },
    });

    if (!findProduct)
      return res.status(404).json({ msg: 'produk tidak ditemukan' });

    if (req.role === 'admin') {
      await productDb.destroy({ where: { uuid: findProduct.uuid } });
    } else {
      if (req.userId !== findProduct.userId)
        return res.status(403).json({ msg: 'akses tidak sah' });
      await productDb.destroy({
        where: { uuid: findProduct.uuid, userId: req.userId },
      });
    }
    if (req.role === 'admin') {
      await productImgDb.destroy({ where: { uuid: findProduct.uuid } });
    } else {
      if (req.userId !== findProduct.userId)
        return res.status(403).json({ msg: 'akses tidak sah' });
      await productImgDb.destroy({
        where: { uuid: findProduct.uuid, userId: req.userId },
      });
    }
    res.status(200).json({ msg: 'produk berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProductsByUUID,
  getProducts,
  getProductByUUID,
  deleteProduct,
};
