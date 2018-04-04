const { Article, Comment } = require("../models/models");

const getAllArticles = (req, res, next) => {
  Article.find()
    .lean()
    .then(allArticles => {
      res.send({ allArticles });
    })
    .catch(err => next(err));
};

const getArticleById = (req, res, next) => {
  const articleID = req.params.article_id;
  Article.findById(articleID)
    .lean()
    .then(article => res.send({ article }))
    .catch(next);
};

const getCommentsByArticle = (req, res, next) => {
  const articleID = req.params.article_id;

  Comment.find({ belongs_to: articleID })
    .then(comments => {
      res.status(200).send(comments);
    })
    .catch(err => next(err));
};

const postComment = (req, res, next) => {
  const articleID = req.params.article_id;
  const newComment = new Comment({
    body: req.body.comment,
    belongs_to: articleID,
    created_by: req.body.username,
    created_at: new Date().getTime()
  });
  newComment
    .save()
    .then(savedComment => res.status(201).send({ savedComment }))
    .catch(err => next(err));
};

const putArticleVote = (req, res, next) => {
  const articleID = req.params.article_id;
  const vote = req.query.vote;
  const swing = vote === "up" ? 1 : -1;
  Article.findByIdAndUpdate(
    articleID,
    { $inc: { votes: swing } },
    { new: true }
  )
    .lean()
    .then(article => {
      res.send({ article });
    })
    .catch(err => next(err));
};

module.exports = {
  getAllArticles,
  getCommentsByArticle,
  getArticleById,
  postComment,
  putArticleVote
};
