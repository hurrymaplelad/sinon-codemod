const sinon = require("sinon");

describe('dummy suite', () => {
    let sandbox = null;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('dummy test', () => {
        sandbox.stub({}, 'dummyFunction').returns({});
        sandbox.spy({}, 'dummyFunction');
        sandbox.mock({});
    })
});