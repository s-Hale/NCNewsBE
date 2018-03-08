
const router = require('express').Router();

const topicsRouter = require('./topics');
const articlesRouter = require('./articles');
const usersRouter = require('./users');
// const commentsRouter = require('./comments');

router.use('/topics', topicsRouter);
router.use('/articles', articlesRouter);
router.use('/users', usersRouter);
// router.use('/comments', commentsRouter)

module.exports = router;