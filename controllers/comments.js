const Comment = require("../models/comments");

const deleteComment = (req, res, next) => {
  const commentID = req.params.comment_id;
  Comment.findOne({ _id: commentID })
    .lean()
    .then(comment => {
      if (comment.created_by === "northcoder")
        return Comment.remove({ _id: commentID });
      else res.status(403);
    })
    .then(() => res.status(200).send("comment deleted"))
    .catch(next);
};

const putCommentVote = (req, res, next) => {
  const commentID = req.params.comment_id;
  const vote = req.query.vote;
  Comment.findOne({ _id: commentID })
    .lean()
    .then(comment => {
      if (vote === "up") comment.votes += 1;
      else if (vote === "down" && comment.votes) comment.votes -= 1;
      res.send({ comment });
    })
    .catch(next);
};

module.exports = { deleteComment, putCommentVote };
