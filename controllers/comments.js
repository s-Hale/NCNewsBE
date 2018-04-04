const Comment = require("../models/comments");

const deleteComment = (req, res, next) => {
  const commentID = req.params.comment_id;
  Comment.findByIdAndRemove(commentID).then(comment => {
    res.status(200).send({ msg: "comment deleted" });
  });
};

const putCommentVote = (req, res, next) => {
  const commentID = req.params.comment_id;
  const vote = req.query.vote;
  const swing = vote === "up" ? 1 : -1;
  Comment.findByIdAndUpdate(
    commentID,
    { $inc: { votes: swing } },
    { new: true }
  )
    .lean()
    .then(comment => {
      res.send({ comment });
    })
    .catch(err => next(err));
};

module.exports = { deleteComment, putCommentVote };
