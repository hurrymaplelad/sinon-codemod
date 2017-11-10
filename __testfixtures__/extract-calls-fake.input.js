const sinon = require("sinon");

let obj = {
  example: 'oldValue',
  prop: 'foo',
  foo: function () {
  }
};
// function
sinon.stub(obj, 'foo', function () {
  return 'boom';
}).toString();
sinon.stub(obj, 'bar');

// Arrow Function
sinon.stub(obj, 'foo', () => {});

// getter
const fakeGetter = function () {
  return false;
};
sinon.stub(obj, "prop", {get: fakeGetter});
sinon.stub(obj, 'prop', {
  get() {
    return false;
  }
});

// setter
function setterFn(val) {
  obj.example = val;
}

sinon.stub(obj, 'prop', {set: setterFn});
sinon.stub(obj, 'prop', {
  set(val) {
    obj.example = val;
  }
});

sinon.stub(obj, 'someMethod', myFunc);

// sandboxed variations
this._sandbox.stub(obj, 'foo', () => {});

query = this._sandbox.stub(someobj.foo, 'query', aFunction.bind(null, 'then', arg1));