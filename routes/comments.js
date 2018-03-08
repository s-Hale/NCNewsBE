
const router = require('express').Router();
const { deleteComment } = require('../controllers/comments');


router.route('/:comment_id')
  .delete(deleteComment)



module.exports = router;