const config = require('@lukeshay/jest-config');

config['globals'] = {
  'ts-test': {
    tsconfigfile: './jest.tsconfig.json',
  },
};

// TODO(Luke): Remove this when package is updated.
config['moduleNameMapper'] = {
  '\\.(css)$': 'identity-obj-proxy',
};

// TODO(Luke): Remove this when package is updated.
config['transform'] = {
  '^.+.(ts|tsx)$': 'ts-jest',
  '^.+.(js|jsx)$': 'babel-jest',
  '^.+.svg$': 'jest-svg-transformer',
};

config['setupFiles'] = ['./src/__mocks__/setupEnzyme.ts'];

// eslint-disable-next-line prettier/prettier
// TODO(Luke): Remove this when package is updated.
config['testRegex'] = '(test|spec).(js|jsx|ts|tsx)$';

module.exports = config;
