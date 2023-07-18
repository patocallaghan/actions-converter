const { getParser } = require('codemod-cli').jscodeshift;

module.exports = function transformer(file, api) {
  const j = getParser(api);

  return j(file.source)
    .find(j.ObjectProperty, {
      key: { name: 'tagName' },
      value: { value: '' },
    })
    .forEach((path) => {
      path.prune();
    })
    .toSource();
};

module.exports.type = 'js';
