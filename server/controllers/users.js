const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const { createToken } = require('../utils');

const login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const body = req.body;

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
    User.findById(user._id, (error, user) => {
      if (error) return res.sendStatus(403);
      return res.status(200).json({ success: true, data: { user } });
    });
  });
};
module.exports = {
  login,
  createUser,
  checkToken
};
