// eslint.config.js
export default [
    {
      ignores: ['eslint.config.js'],
      files: ['**/*.js'],
      languageOptions: {
        ecmaVersion: 'latest',
      },
      rules: {
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-var': 'error',
        'camelcase': 'error',
        'eqeqeq': 'error',
        'curly': 'error',
        'indent': ['error', 2],
      },
    },
  ];
  