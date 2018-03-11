const sinon = require("sinon");

const obj = {foo: () => {}};

// function
sinon.stub(obj, 'foo').callsFake(function () {
  return 'boom';
}).toString();
sinon.stub(obj, 'bar');

// Arrow Function
sinon.stub(obj, 'foo').callsFake(() => {});

// getter
const fakeGetter = function () {
  return false;
};
sinon.stub(obj, "prop").get(fakeGetter);
sinon.stub(obj, 'prop').get(function() {
  return false;
});

// setter
function setterFn(val) {
  obj.example = val;
}

sinon.stub(obj, 'prop').set(setterFn);
sinon.stub(obj, 'prop').set(function(val) {
  obj.example = val;
});

function myFunc() {}
sinon.stub(obj, 'someMethod').callsFake(myFunc);

// sandboxed variations
this._sandbox.stub(obj, 'foo').callsFake(() => {});

const someobj = {foo: {query: () => {}}};
let arg1, aFunction;
const query = this._sandbox.stub(someobj.foo, 'query').callsFake(aFunction.bind(null, 'then', arg1));
