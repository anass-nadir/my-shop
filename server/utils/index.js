const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, {_id}) => {
    if (err) return res.sendStatus(403);
    req.user = _id;
    next();
  });
};
const createToken = ({_id, email}, expiresIn) => {
  return jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn });
};
module.exports = {
  authenticateToken,
  createToken
};
