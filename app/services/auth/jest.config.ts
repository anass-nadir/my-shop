import base from '../../../jest.config.base';
import packageJson from './package.json';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...base,
  setupFilesAfterEnv: ['./src/__test__/setup.ts'],
  name: packageJson.name,
  displayName: packageJson.name
};
export default config;
