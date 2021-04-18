module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__test__/*.spec.(ts|tsx)'],
  testEnvironment: 'node',
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/build/',
    'node_modules'
  ],
  coverageDirectory: '<rootDir>/coverage/',
  verbose: true
};
