function transformer(file, api) {
  const j = api.jscodeshift;
  return j(file.source)
    .find(j.CallExpression, {
      callee: {
        object: {
          name: 'sinon',
        },
        property: {
          name: 'stub',
        }
      },
      arguments: {
        length: 3
      }
    })
    .replaceWith(path => {
        let callNode = path.node;
        // console.log('EXP', path.node)
        let fakeFn = callNode.arguments.pop();
        return j.memberExpression(
          callNode,
          j.callExpression(
            j.identifier('callsFake'),
            [fakeFn]
          )
        );
      }
    ).toSource();
}

module.exports = transformer;
