module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/app/**/*.{ts,js}",
    '!src/app/core/state/**',
    "!src/**/*.module.ts"
  ],
};
