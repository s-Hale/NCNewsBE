const router = require("express").Router();
const { getAllTopics, getArticlesForTopic } = require("../controllers/topics");

router.route("/").get(getAllTopics);

router.route("/:topic/articles").get(getArticlesForTopic);

module.exports = router;
