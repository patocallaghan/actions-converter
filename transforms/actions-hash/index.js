const { getParser } = require('codemod-cli').jscodeshift;

module.exports = function transformer(file, api) {
  const j = getParser(api);

  let source;
  const actions = [];

  j(file.source)
    .find(j.ObjectProperty, { value: { callee: { name: 'action' } } })
    .forEach((path) => {
      actions.push(path);
    });

  let actionsHash = j(file.source).find(j.ObjectProperty, { key: { name: 'actions' } });

  if (actionsHash.length) {
    source = actionsHash
      .forEach((path) => {
        actions.forEach((action) => {
          let func = action.value.value.arguments[0];
          let method = j.objectMethod(
            'method',
            j.identifier(action.value.key.name),
            func.params,
            func.body
          );
          method.async = func.async;
          path.value.value.properties = [...path.value.value.properties, method];
        });
      })
      .toSource({ quote: 'single', trailingComma: true });
  } else {
    source = j(file.source)
      .find(j.MemberExpression, { object: { name: 'Component' }, property: { name: 'extend' } })
      .forEach((path) => {
        let hash = j.objectProperty(j.identifier('actions'), j.objectExpression([]));
        let updatedActions = actions.map((action) => {
          let func = action.value.value.arguments[0];
          let method = j.objectMethod(
            'method',
            j.identifier(action.value.key.name),
            func.params,
            func.body
          );
          method.async = func.async;
          return method;
        });
        hash.value.properties = updatedActions;
        path.parentPath.value.arguments[0].properties = [
          ...path.parentPath.value.arguments[0].properties,
          hash,
        ];
      })
      .toSource({ quote: 'single', trailingComma: true });
  }

  source = j(source)
    .find(j.ObjectProperty, { value: { callee: { name: 'action' } } })
    .forEach((path) => {
      path.prune();
    })
    .toSource({ quote: 'single', trailingComma: true });

  return j(source).toSource({ quote: 'single', trailingComma: true });
};

module.exports.type = 'js';
