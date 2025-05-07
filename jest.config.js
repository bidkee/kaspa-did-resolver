module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/*.test.ts'],
  testPathIgnorePatterns: ['/dist/'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};