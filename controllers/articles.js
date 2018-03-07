
const {Article} = require('../models/models');

const getAllArticles = (req, res, next) => {
  Article.find().lean()
    .then(allArticles => {
      
      res.send({ allArticles })
    })
    .catch(err => next(err));
};

module.exports = { getAllArticles };