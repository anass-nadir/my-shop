const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { createToken } = require('../utils');
require("../utils/passport");
const login = async (req, res) => {
  await User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(400).json({ success: false, error: 'User not found' });
    }

    return user.comparePassword(req.body.password, (err, isMatch) => {
      if (err || !isMatch)
        return res
          .status(400)
          .json({ success: false, error: 'User not found' });
      const token = createToken(user, 24 * 10 * 60);
      return res.status(200).json({ success: true, data: { user, token } });
    });
  }).catch((error) => {
    return res.status(400).json({
      success: false,
      error
    });
  });
};
const createUser = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false
    });
  }

  const user = new User(body);

  if (!user) {
    return res.status(400).json({ success: false });
  }

  user
    .save()
    .then(() => {
      const token = createToken(user, 24 * 10 * 60);
      return res.status(201).json({
        success: true,
        data: { user, token },
        message: 'User created!'
      });
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error
      });
    });
};
const checkToken = (req, res) => {
  const token = req.query.token;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    return res.status(200).json({ success: true, data: { user: user.user } });
  });
};
module.exports = {
  login,
  createUser,
  checkToken
};
