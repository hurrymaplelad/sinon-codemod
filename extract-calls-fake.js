function transformer(file, api) {
  const j = api.jscodeshift;
  const source = j(file.source);
  const replacer = path => {
    let callNode = path.node;
    // console.log('EXP', path.node);
    let fakeImplementationNode = callNode.arguments.pop();
    // sinon.stub(obj, 'foo', function () { return 'boom'; })
    // sinon.stub(obj, 'foo', () => {})
    if (fakeImplementationNode.type === "FunctionExpression" || fakeImplementationNode.type === "ArrowFunctionExpression") {
      return j.memberExpression(
        callNode,
        j.callExpression(
          j.identifier('callsFake'),
          [fakeImplementationNode]
        )
      );
    } else if (fakeImplementationNode.type === "ObjectExpression") {
      // getter/setter
      const properties = fakeImplementationNode.properties;
      if (!properties) {
        return;
      }
      // { get: fake, set: fake } pattern is not supported yet.
      if (properties.length > 1) {
        throw new Error("NOT support");
      }
      const property = properties[0];
      if (property.kind !== "init" || !property.key) {
        return;
      }
      if (property.key.name !== "get" && property.key.name !== "set") {
        return; // this is not getter or setter
      }
      const isGetter = property.key.name === "get";
      // => stub(obj, "prop").get(fn)
      if (isGetter) {
        return j.memberExpression(
          callNode,
          j.callExpression(
            j.identifier('get'),
            [property.value]
          )
        );
      } else {
        // => stub(obj, "prop").set(fn)
        return j.memberExpression(
          callNode,
          j.callExpression(
            j.identifier('set'),
            [property.value]
          )
        );
      }
    }
  };

    source.find(j.CallExpression, {
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
    .replaceWith(replacer);

    return source.find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'MemberExpression',
          object: {
            type: 'ThisExpression'
          },
          property: {
            type: 'Identifier',
            name: '_sandbox'
          }
        },
        property: {
          name: 'stub',
        }
      },
      arguments: {
        length: 3
      }
    })
    .replaceWith(replacer)
    .toSource();
}

module.exports = transformer;
