module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/types/**',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!dist/**/*',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 70,
      lines: 80,
    },
  },
  transform: {
    '^.+.(ts|tsx)$': 'ts-jest',
    '^.+.(js|jsx)$': 'babel-jest',
  },
  coverageReporters: ['lcov'],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '\\.(svg)$': '<rootDir>/src/__mocks__/svgSpriteMock.ts',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  reporters: ['default', 'jest-junit'],
  testRegex: '**/*.(test|spec).(js|jsx|ts|tsx)$',
  setupFiles: ['./src/__tests__/setupEnzyme.ts'],
  globals: {
    'ts-test': {
      tsConfigFile: './jest.tsconfig.json',
    },
  },
};
