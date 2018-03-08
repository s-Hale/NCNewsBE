
const router = require('express').Router();
const { getAllArticles, getCommentsByArticle, getArticleById, postComment } = require('../controllers/articles');

router.route('/')
  .get(getAllArticles);

router.route('/:article_id')
  .get(getArticleById)

router.route('/:article_id/comments')
  .get(getCommentsByArticle)
  .post(postComment)
  

  module.exports = router;