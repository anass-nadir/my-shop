const User = require("../models/user");

const login = async (req, res) => {
  await User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err || !isMatch)
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      return res.status(200).json({ success: true, data: user });
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
      success: false,
    });
  }

  const user = new User(body);

  if (!user) {
    return res.status(400).json({ success: false });
  }

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        user: user,
        message: "User created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error
      });
    });
};
module.exports = {
  login,
  createUser,
};
