const express = require('express');
const {
  createArticle,
  getArticleByTitle,
  // getArticleImgByTitle,
  getArticles,
  getArticlesByUUID,
  updateArticle,
} = require('../controllers/Article.js');
const  verifyUser  = require('../middleware/Verify.js');

const articleRouter = express.Router();

articleRouter.post('/article/create', verifyUser, createArticle);
articleRouter.patch('/article/edit/:uuid', verifyUser, updateArticle);
articleRouter.get('/article/:paramsTitle', getArticleByTitle);
// articleRouter.get('/articlesimg/:title', getArticleImgByTitle);
articleRouter.get('/articles', getArticles);
articleRouter.get('/userArticles', verifyUser, getArticlesByUUID);

module.exports = articleRouter;
