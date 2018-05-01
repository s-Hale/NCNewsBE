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
    .then(article => {
      if (!article) {
        res.status(404);
        res.statusMessage = "article not found.";
        res.end();
      }
      res.send({ article });
    })
    .catch(err => {
      err.status = 400;
      next(err);
    });
};

const getCommentsByArticle = (req, res, next) => {
  const articleID = req.params.article_id;
  Comment.find({ belongs_to: articleID })
    .then(comments => {
      if (!comments) {
        res.status(404);
        res.statusMessage = "comments not found.";
        res.end();
      }
      res.status(200).send(comments);
    })
    .catch(err => {
      err.status = 400;
      next(err);
    });
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
  const articleVote = req.query.articleVote;
  const vote = req.query.vote;
  let swing = 0;
  if (vote === "up") swing = 1;
  if (vote === "down" && articleVote > 0) swing = -1;
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
