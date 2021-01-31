const { passport } = require('../services');
const { User } = require('../models');

const login = (req, res) => {
  try {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!user) {
        return res.status(400).json({ success: false, ...info });
      }

      req.logIn(user, (err) => {
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({
          success: true,
          user: Object.assign(user, { password: undefined })
        });
      });
    })(req, res);
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
const createUser = (req, res) => {
  try {
    const body = req.body;

    const user = new User(body);

    if (!user) {
      return res.status(400).json({ success: false });
    }

    user
      .save()
      .then(() => {
        passport.authenticate('local', (err, user, info) => {
          if (err) {
            return res.status(400).json({ success: false, error: err });
          }
          if (!user) {
            return res.status(400).json({ success: false, ...info });
          }

          req.logIn(user, (err) => {
            if (err) {
              return res.status(400).json({ success: false, error: err });
            }
            return res.status(201).json({
              success: true,
              user: Object.assign(user, { password: undefined }),
              message: 'User created!'
            });
          });
        })(req, res);
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
const logoutUser = (req, res) => {
  try{
    req.logout();
    req.session.destroy(() => {
      res.clearCookie("my-shop-sess", { path: "/" });
      return res.status(200).json({
        success: true
      });
    });
    
  }catch(error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
  
  
}

module.exports = {
  login,
  createUser,
  logoutUser
};
