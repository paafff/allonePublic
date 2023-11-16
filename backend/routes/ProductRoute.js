const express = require('express');

const  verifyUser  = require('./../middleware/Verify.js');
const {
  createProduct,
  deleteProduct,
  getProductByUUID,
  getProducts,
  getProductsByUUID,
  // getProductsInfo,
  updateProduct,
} = require('../controllers/Product.js');

const productRouter = express.Router();

productRouter.get('/userProducts', verifyUser, getProductsByUUID);
// productRouter.get('/product/:uuid', verifyUser, getProductByUUID);
productRouter.post('/product/create', verifyUser, createProduct);
productRouter.patch('/product/:uuid', verifyUser, updateProduct);
productRouter.delete('/product/:uuid', verifyUser, deleteProduct);

//public non auth required (tanpa perlu auth)
productRouter.get('/products', getProducts);
productRouter.get('/product/:uuid', getProductByUUID);

module.exports = productRouter;
