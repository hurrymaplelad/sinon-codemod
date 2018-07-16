function transformer(file, api) {
  const j = api.jscodeshift;
  const source = j(file.source);

  const replacer = path => {
    path.value.callee.object.name = 'sinon';
    return path.value;
  };

  /*
  let sandbox = null;

  ->

  */
  source
    .find(j.VariableDeclaration, {declarations: [{id: {name: 'sandbox'}}]})
    .remove();

  /*
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  ->

  beforeEach(() => {});
  */
  source
    .find(j.AssignmentExpression, {
      right: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            type: 'MemberExpression',
            object: {
              name: 'sinon'
            },
            property: {
              name: 'sandbox'
            }
          }
        }
      }
    })
    .remove();

  /*
  sandbox.stub({}, 'dummyFunction').returns({});

  ->

  sinon.stub({}, 'dummyFunction').returns({});
  */
  source
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: {
          name: 'sandbox'
        },
        property: {
          name: 'stub'
        }
      }
    })
    .replaceWith(replacer);

  /*
  sandbox.spy({}, 'dummyFunction');

  ->

  sinon.spy({}, 'dummyFunction');
  */
  source
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: {
          name: 'sandbox'
        },
        property: {
          name: 'spy'
        }
      }
    })
    .replaceWith(replacer);

  /*
  sandbox.mock({}));

  ->

  sinon.mock({});
  */
  source
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: {
          name: 'sandbox'
        },
        property: {
          name: 'mock'
        }
      }
    })
    .replaceWith(replacer);

  /*
  sandbox.restore();

  ->

  sinon.restore();
  */
  source
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: {
          name: 'sandbox'
        },
        property: {
          name: 'restore'
        }
      }
    })
    .replaceWith(replacer);

  return source.toSource();
}

module.exports = transformer;
