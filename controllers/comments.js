const Comment = require("../models/comments");

const deleteComment = (req, res, next) => {
  const {comment_id} = req.params;
  Comment.findByIdAndRemove(comment_id).then(comment => {
    res.status(200).send({ msg: "comment deleted" });
  });
};

const putCommentVote = (req, res, next) => {
  const { comment_id } = req.params;
  const { vote } = req.query;
  const inc = vote === 'up' ? 1 : vote === 'down' ? -1 : 0;

  Comment.findByIdAndUpdate(
    comment_id,
    { $inc: { votes: inc } },
    { new: true }
  )
    .lean()
    .then(comment => {
      res.send({ comment });
    })
    .catch(err => next(err));
};

module.exports = { deleteComment, putCommentVote };
