const User = require("../models/users");

const getUserByUsername = (req, res, next) => {
  const username = req.params.username;
  User.findOne({ username: username }, { __v: false })
    .lean()
    .then(user => res.send({ user }))
    .catch(next);
};

module.exports = getUserByUsername;
