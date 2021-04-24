module.exports = {
  roots: ['<rootDir>'],
  projects: [
    '<rootDir>/app/server/packages/*',
    '<rootDir>/app/server/services/*'
  ]
};
process.env = Object.assign(process.env, {
  JWT_SECRET: 'asdasdasd',
  SESSION_NAME: 'my-shop-sess',
  NODE_TLS_REJECT_UNAUTHORIZED: 0
});
