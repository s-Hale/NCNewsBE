const { Article, Comment } = require("../models/models");

const getAllArticles = (req, res, next) => {
  Article.find()
    .lean()
    .then(allArticles => {
      if (!allArticles) next({ status: 404, msg: "no articles found" });
      else res.send({ allArticles });
    })
    .catch(err => {
      err.status = 400;
      next(err);
    });
};

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  Article.findById(article_id)
    .lean()
    .then(article => {
      if (!article) {
        next({ status: 404, msg: "article not found" });
      } else res.send({ article });
    })
    .catch(err => {
      err.status = 400;
      next(err);
    });
};

const getCommentsByArticle = (req, res, next) => {
  Comment.find( req.params )
    .then(comments => {
      if (!comments) next({ status: 404, msg: "comments not found" });
      else res.status(200).send(comments);
    })
    .catch(err => {
      err.status = 400;
      next(err);
    });
};

const postComment = (req, res, next) => {
  const { belongs_to } = req.params;
  const newComment = new Comment({
    body: req.body.comment,
    belongs_to,
    created_by: req.body.username,
    created_at: new Date().getTime()
  });
  if (!newComment.body) next({ status: 400, msg: "invalid post body" });
  newComment
    .save()
    .then(savedComment => res.status(201).send({ savedComment }))
    .catch(err => next(err));
};

const putArticleVote = (req, res, next) => {
  const { article_id } = req.params;
  const articleVote = req.query.articleVote;
  const vote = req.query.vote;
  const inc = vote === 'up' ? 1 : vote === 'down' ? -1 : 0;
  Article.findByIdAndUpdate(
    article_id,
    { $inc: { votes: inc } },
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
