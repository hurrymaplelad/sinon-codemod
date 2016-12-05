const sinon = require("sinon");

let o = {foo: function() {}};
sinon.stub(o, 'foo').callsFake(function () { return 'boom'; }).toString();
sinon.stub(o, 'bar');
