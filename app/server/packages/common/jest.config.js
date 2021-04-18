/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('../../../../jest.config.base');
const packageJson = require('./package');

module.exports = {
  ...base,
  setupFilesAfterEnv: ['./src/test/setup.ts'],
  name: packageJson.name,
  displayName: packageJson.name
};
