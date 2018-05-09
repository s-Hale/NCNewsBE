const User = require("../models/users");

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  User.findOne({ username: username }, { __v: false })
    .lean()
    .then(user => {
      if (!user) 
        next({ status: 404, msg: "user not found" })
      else res.send({ user });
    })
    .catch(err => {
      err.status = 400;
      next(err);
    });
};

module.exports = getUserByUsername;
