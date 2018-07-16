const sinon = require("sinon");

describe('dummy suite', () => {
    beforeEach(() => {});

    afterEach(() => {
        sinon.restore();
    });

    it('dummy test', () => {
        sinon.stub({}, 'dummyFunction').returns({});
        sinon.spy({}, 'dummyFunction');
        sinon.mock({});
    })
});