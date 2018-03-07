
const {Article, Comment} = require('../models/models');


const getAllArticles = (req, res, next) => {
  Article.find().lean()
    .then(allArticles => {
      res.send({ allArticles })
    })
    .catch(err => next(err));
};

const getArticleById = (req, res, next) => {
  const articleID = req.params.article_id;
  Article.findById(articleID).lean()
    .then(article => res.send({ article }))
    .catch(next);
}

const getCommentsByArticle = (req, res, next) => {
  const articleID = req.params.article_id;
  Comment.find({belongs_to: articleID})
    .then(comments => {
      res.status(200).send(comments)
    })
    .catch(err => console.log(err))
}

module.exports = { getAllArticles, getCommentsByArticle, getArticleById };