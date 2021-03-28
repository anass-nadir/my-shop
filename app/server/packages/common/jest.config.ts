import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./src/test/setup.ts'],
    testEnvironment: 'node',
    name: 'common package'
  };
};
