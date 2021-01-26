const jwt = require('jsonwebtoken');

const createToken = ({_id, email}, expiresIn) => {
  return jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn });
};
module.exports = {
  createToken
};
