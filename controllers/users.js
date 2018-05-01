const User = require("../models/users");

const getUserByUsername = (req, res, next) => {
  const username = req.params.username;
  User.findOne({ username: username }, { __v: false })
    .lean()
    .then(user => {
      if (!user) {
        res.status(404);
        res.statusMessage = "user not found.";
        res.end();
      }
      res.send({ user });
    })
    .catch(err => {
      err.status = 400;
      next(err);
    });
};

module.exports = getUserByUsername;
