const { Article, Topic } = require("../models/models");

const getAllTopics = (req, res, next) => {
  Topic.find({}, { __v: false })
    .lean()
    .then(topics => res.send({ topics }))
    .catch(err => next(err));
};

const getArticlesForTopic = (req, res, next) => {
  const topicSlug = req.params.topic;
  Topic.findOne({ slug: topicSlug }, { __v: false })
    .lean()
    .then(topic => {
      return Article.find({ belongs_to: topic.slug }, { __v: false }).lean();
    })
    .then(articles => {
      res.send({ articles });
    })
    .catch(next);
};

module.exports = { getAllTopics, getArticlesForTopic };
