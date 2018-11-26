const defineTest = require('jscodeshift/dist/testUtils').defineTest;
describe('migrate-to-v5', () => {
  defineTest(__dirname, 'migrate-to-v5');
});
