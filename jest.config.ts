import base from './jest.config.base';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...base,
  roots: ['<rootDir>'],
  projects: ['<rootDir>/app/packages/*', '<rootDir>/app/services/*']
};

process.env = Object.assign(process.env, {
  JWT_SECRET: 'asdasdasd',
  SESSION_NAME: 'my-shop-sess',
  NODE_TLS_REJECT_UNAUTHORIZED: 0
});
export default config;
