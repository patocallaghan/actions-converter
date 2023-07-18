'use strict';

const { runTransformTest } = require('codemod-cli');

runTransformTest({ 
  name: 'tagname-prune',
  path: require.resolve('./index.js'),
  fixtureDir: `${__dirname}/__testfixtures__/`,
});