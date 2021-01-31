const { User } = require('../models');

const getLoggedUser = async (req, res) => {
  try {
    const reqUserId = req.user._id;
    let user = await User.findById(reqUserId, (err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }
      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: 'User not found' });
      }
      return user;
    });
    return res.status(200).json({
      success: true,
      user: Object.assign(user, { password: undefined })
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
module.exports = {
  getLoggedUser
};
