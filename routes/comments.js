const router = require("express").Router();
const { deleteComment, putCommentVote } = require("../controllers/comments");

router
  .route("/:comment_id")
  .delete(deleteComment)
  .put(putCommentVote);

//patch comment

module.exports = router;
