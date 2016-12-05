const defineTest = require('jscodeshift/dist/testUtils').defineTest;
describe('extract-calls-fake', () => {
  defineTest(__dirname, 'extract-calls-fake');
});
