const config = require('@lukeshay/jest-config');

config['globals'] = {
  'ts-test': {
    tsconfigfile: './jest.tsconfig.json',
  },
};

config['setupFiles'] = ['./src/__mocks__/setupEnzyme.ts'];

module.exports = config;
