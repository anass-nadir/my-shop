const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    req.currentUser = jwt.verify(req.session.jwt, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error(err.message);
  }
  next();
};
