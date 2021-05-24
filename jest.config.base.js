module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__test__/*.spec.(ts|tsx)'],
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}"
  ],
  coverageDirectory: '<rootDir>/coverage/',
  verbose: true
};
