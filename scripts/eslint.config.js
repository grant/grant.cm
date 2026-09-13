const globals = require('globals');
const ignores = require('./eslint.ignores.js');

module.exports = [
  {ignores},
  ...require('gts'),
  {
    // CommonJS config files.
    files: ['**/*.js'],
    languageOptions: {globals: {...globals.node}},
  },
];
