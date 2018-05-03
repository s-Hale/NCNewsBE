const { Article, Topic } = require("../models/models");

const getAllTopics = (req, res, next) => {
  Topic.find({}, { __v: false })
    .lean()
    .then(topics => {
      if (!topics) next({ status: 404, msg: "topics not found" });
      else res.send({ topics });
    })
    .catch(err => {
      err.status = 400;
      next(err);
    });
};

const getArticlesForTopic = (req, res, next) => {
  const topicSlug = req.params.topic;
  let topicResponse;
  Topic.findOne({ slug: topicSlug }, { __v: false })
    .lean()
    .then(topic => {
      topicResponse = topic
      if (!topic) return { status: 404, msg: "topic not found" };
      else {
        return Article.find({ belongs_to: topic.slug }, { __v: false })
        .lean()
      }
    })
    .then(articles => {
      if (!topicResponse || !articles) next({ status: 404, msg: "no articles found" })
      else res.send({ articles });
    })
    .catch(err => {
      err.status = 400;
      next(err);
    });
};

module.exports = { getAllTopics, getArticlesForTopic };
