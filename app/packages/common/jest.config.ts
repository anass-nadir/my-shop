import base from '../../../jest.config.base';
import packageJson from './package.json';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...base,
  setupFilesAfterEnv: ['./src/test/setup.ts'],
  name: packageJson.name,
  displayName: packageJson.name
};
export default config;
