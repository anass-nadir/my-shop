import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__test__/*.spec.(ts|tsx)'],
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coverageDirectory: '<rootDir>/coverage/',
  verbose: true
};
export default config;
