// eslint-disable-next-line @typescript-eslint/no-var-requires
const base = require('./jest.config.base');

module.exports = {
  ...base,
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
