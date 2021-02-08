const jwt = require('jsonwebtoken');
const User = require('../models');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordsMatch = await user.comparePassword(password);

    if (!passwordsMatch) {
      throw new Error('Invalid credentials');
    }

    const userJwt = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * 24 * 1000 }
    );
    req.session = {
      jwt: userJwt
    };
    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });

    await user.save();

    const userJwt = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * 24 * 1000 }
    );
    req.session = {
      jwt: userJwt
    };
    return res.status(201).json({
      success: true,
      user,
      message: 'User created!'
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
const logoutUser = (req, res) => {
  try {
    req.session = null;
    res.clearCookie('my-shop-sess', { path: '/' });
    return res.status(200).json({
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  login,
  createUser,
  logoutUser
};
