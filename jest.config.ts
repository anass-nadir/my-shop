import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__test__/*.(ts|tsx)'],
    projects: ['app/client', 'app/server/packages/*', 'app/server/services/*']
  };
};
