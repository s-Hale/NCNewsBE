const { Article, Topic } = require("../models/models");

const getAllTopics = (req, res, next) => {
  Topic.find({}, { __v: false })
    .lean()
    .then(topics => {
      // if (!topics) {
      //   res.status(404);
      //   res.statusMessage = "topics not found.";
      //   res.end();
      // }
      res.send({ topics });
    })
    .catch(err => {
      err.status = 400;
      next(err);
    });
};

const getArticlesForTopic = (req, res, next) => {
  const topicSlug = req.params.topic;
  Topic.findOne({ slug: topicSlug }, { __v: false })
    .lean()
    .then(topic => {
      if (!topic) {
        res.status(404);
        res.statusMessage = "no articles found.";
        res.end();
      }
      return Article.find({ belongs_to: topic.slug }, { __v: false }).lean();
    })
    .then(articles => {
      if (!articles) {
        res.status(404);
        res.statusMessage = "no articles found.";
        res.end();
      }
      res.send({ articles });
    })
    .catch(err => {
      err.status = 400;
      next(err);
    });
};

module.exports = { getAllTopics, getArticlesForTopic };
