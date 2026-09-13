const globals = require('globals');
const ignores = require('./eslint.ignores.js');

module.exports = [
  {ignores},
  ...require('gts'),
  {
    // CommonJS config files (next.config.js, postcss.config.js, etc.)
    files: ['**/*.js'],
    languageOptions: {globals: {...globals.node}},
  },
  {
    // Test files may import devDependencies (vitest, testing-library).
    files: ['**/*.test.ts', '**/*.test.tsx', 'vitest.setup.ts'],
    rules: {
      'n/no-unpublished-import': 'off',
    },
  },
];
